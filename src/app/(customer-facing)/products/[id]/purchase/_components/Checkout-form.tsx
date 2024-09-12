'use client';

import { FormEvent, useState } from 'react';
import { Product } from '@prisma/client';
import {
  Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { formatCurrency } from '@/lib/formatters';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userOrderExists } from '@/app/actions/orders';

type FormProps = {
  priceInCents: number,
  productId: string,
}

type CheckoutFormProps = {
  product: Product,
  clientSecret: string,
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const errorTypesShownToUser = [
  'card_error',
  'validation_error',
];

function Form({ priceInCents, productId }: FormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (stripe == null || elements == null || email == null) {
      return;
    }

    setIsLoading(true);

    const orderExists = await userOrderExists(email, productId);
    if (orderExists) {
      setErrorMessage('You have already purchased this product. Please check "My Orders" page!');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      });

      if (errorTypesShownToUser.includes(error.type)) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement onChange={(ev) => setEmail(ev.value.email)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading ? 'Purchasing...' : `Purchase - ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="relative w-1/3 aspect-video flex-shrink-0">
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
        </div>
      </div>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Form priceInCents={product.priceInCents} productId={product.id} />
      </Elements>
    </div>
  );
}

export default CheckoutForm;
