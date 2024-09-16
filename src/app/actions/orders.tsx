'use server';

import { z } from 'zod';
import db from '@/db/db';
import { Resend } from 'resend';
import OrderHistoryEmail from '@/email/Order-history';
import { createDownloadLink } from '@/lib/product';

const message = 'Please check your email to view your order history and download your products';

const emailSchema = z.string().email();

const resend = new Resend(process.env.RESEND_API_KEY);

async function userOrderExists(email: string, productId: string) {
  const order = await db.order.findFirst({
    where: { user: { email }, productId },
    select: { id: true },
  });

  return order != null;
}

async function emailOrderHistory(
  prevState: unknown,
  formData: FormData,
): Promise<{error?: string, message?: string}> {
  const email = emailSchema.safeParse(formData.get('email'));
  if (!email.success) {
    return { error: 'Invalid email addres' };
  }

  const user = await db.user.findUnique({
    where: {
      email: email.data,
    },
    select: {
      email: true,
      orders: {
        select: {
          id: true,
          createdAt: true,
          pricePaidInCents: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });
  if (user == null) {
    return { message };
  }

  const ordersPromise = user.orders.map(async (order) => ({
    ...order,
    downloadVerificationId: await createDownloadLink(order.product.id),
  }));
  const orders = await Promise.all(ordersPromise);

  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: 'Order History',
    react: (
      <OrderHistoryEmail
        orders={orders}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
      />
    ),
  });

  if (data.error) {
    return { error: 'Error on sending your email. Please try again.' };
  }

  return { message };
}

export {
  userOrderExists,
  emailOrderHistory,
};
