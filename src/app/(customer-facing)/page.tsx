import ProductSection from '@/components/Product-section';
import { getMostPopularProducts, getNewestProducts } from '@/lib/product';
import { cache } from 'react';

const DAY_IN_SECONDS = 60 * 60 * 24;

export const revalidate = DAY_IN_SECONDS;

const getMostPopularProductsMemoized = cache(() => getMostPopularProducts(6));
const getNewestProductsMemoized = cache(() => getNewestProducts(6));

export default async function Home() {
  return (
    <main className="space-y-12">
      <ProductSection title="Most Popular" productsFetcher={getMostPopularProductsMemoized} />
      <ProductSection title="Newest" productsFetcher={getNewestProductsMemoized} />
    </main>
  );
}
