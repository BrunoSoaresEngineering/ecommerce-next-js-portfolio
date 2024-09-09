import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { Suspense } from 'react';
import { Button } from './ui/button';
import { ProductCard, ProductCardSkeleton } from './Product-card';

function Loading() {
  return (
    <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  );
}

async function ProductSuspense({ productsFetcher }: { productsFetcher: () => Promise<Product[]> }) {
  const products = await productsFetcher();

  return (products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      priceInCents={product.priceInCents}
      description={product.description}
      imagePath={product.imagePath}
    />
  )));
}

type ProductSectionProps = {
  title: string,
  productsFetcher: () => Promise<Product[]>,
}
async function ProductSection({ title, productsFetcher }: ProductSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            View All
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<Loading />}>
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

export default ProductSection;
