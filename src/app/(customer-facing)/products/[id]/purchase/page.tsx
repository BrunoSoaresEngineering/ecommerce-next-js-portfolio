import db from '@/db/db';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import CheckoutForm from './_components/Checkout-form';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type PurchasePageProps = {
  params: {
    id: string
  }
};

async function PurchasePage({ params: { id } }: PurchasePageProps) {
  const product = await db.product.findUnique({ where: { id } });

  if (!product) {
    return notFound();
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: 'EUR',
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error('Strip Payment Intent not created properly');
  }

  return (
    <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
  );
}
export default PurchasePage;
