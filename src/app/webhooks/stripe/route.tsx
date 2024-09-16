import db from '@/db/db';
import PurchaseReceiptEmail from '@/email/Purchase-receipt';
import { createDownloadLink } from '@/lib/product';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === 'charge.succeeded') {
    const chargeData = event.data.object;
    const { email } = chargeData.billing_details;
    const pricePaidInCents = chargeData.amount;
    const { productId } = chargeData.metadata;

    if (email == null) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const userToUpsert = {
      email,
      orders: {
        create: {
          pricePaidInCents,
          productId,
        },
      },
    };

    const downloadVerificationPromise = createDownloadLink(productId);

    const dbInsertPromise = db.user.upsert({
      where: { email },
      create: userToUpsert,
      update: userToUpsert,
      select: {
        orders: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    const productPromise = db.product.findUnique({
      where: { id: productId },
      select: {
        name: true,
        imagePath: true,
        description: true,
      },
    });

    const [downloadVerification, { orders: [order] }, product] = await Promise.all(
      [downloadVerificationPromise, dbInsertPromise, productPromise],
    );

    if (product == null) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Order Confirmation',
      react: (
        <PurchaseReceiptEmail
          downloadVerificationId={downloadVerification}
          order={order}
          product={product}
          serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
        />
      ),
    });
  }

  return new NextResponse();
}
