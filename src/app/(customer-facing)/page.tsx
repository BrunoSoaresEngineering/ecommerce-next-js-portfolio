import ProductSection from '@/components/Product-section';
import { getMostPopularProducts, getNewestProducts } from '@/lib/product';

export default async function Home() {
  return (
    <main className="space-y-12">
      <ProductSection title="Most Popular" productsFetcher={() => getMostPopularProducts(6)} />
      <ProductSection title="Newest" productsFetcher={() => getNewestProducts(6)} />
    </main>
  );
}
