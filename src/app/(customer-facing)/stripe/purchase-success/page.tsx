import Stripe from 'stripe';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/db/db';
import { notFound } from 'next/navigation';
import { formatCurrency } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { createDownloadLink } from '@/lib/product';

type SuccessPageProps = {
  searchParams: {
    payment_intent: string
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function SuccessPage({ searchParams }: SuccessPageProps) {
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);
  const isSuccess = paymentIntent.status === 'succeeded';

  const product = await db.product.findUnique({
    where: {
      id: paymentIntent.metadata.productId,
    },
  });
  if (product == null) {
    return notFound();
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full">
      <h1 className="text-4xl font-bold">{isSuccess ? 'Success!' : 'Error!'}</h1>
      <div className="flex items-center gap-4">
        <div className="relative aspect-video w-1/3 flex-shrink-0">
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-muted-foreground line-clamp-3">
            {product.description}
          </div>
          <Button className="mt-4" size="lg" asChild>
            {isSuccess ? (
              <a href={`/products/download/${await createDownloadLink(product.id)}`}>Download</a>
            ) : (
              <Link href={`/products/${product.id}/purchase}`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default SuccessPage;
