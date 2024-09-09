import ProductSection from '@/components/Product-section';
import { getMostPopularProducts, getNewestProducts } from '@/lib/product';

export default async function Home() {
  return (
    <main className="space-y-12">
      <ProductSection title="Most Popular" productFetcher={() => getMostPopularProducts(6)} />
      <ProductSection title="Newest" productFetcher={() => getNewestProducts(6)} />
    </main>
  );
}
