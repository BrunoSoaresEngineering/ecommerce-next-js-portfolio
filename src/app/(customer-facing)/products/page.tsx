import { ProductCard, ProductCardSkeleton } from '@/components/Product-card';
import db from '@/db/db';
import { Suspense } from 'react';

async function getProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: 'asc' },
  });
}

function Loading() {
  return (
    <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();

  return products.map((product) => (
    <ProductCard
      key={product.id}
      name={product.name}
      description={product.description}
      id={product.id}
      imagePath={product.imagePath}
      priceInCents={product.priceInCents}
    />
  ));
}

async function ProductsPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ProductsSuspense />
      </Suspense>
    </main>
  );
}
export default ProductsPage;
