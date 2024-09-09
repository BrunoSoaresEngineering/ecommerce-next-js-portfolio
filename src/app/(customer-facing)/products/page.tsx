import { ProductCard } from '@/components/Product-card';
import db from '@/db/db';

const getProducts = () => db.product.findMany({
  where: { isAvailableForPurchase: true },
  orderBy: { name: 'asc' },
});

async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          description={product.description}
          id={product.id}
          imagePath={product.imagePath}
          priceInCents={product.priceInCents}
        />
      ))}
    </main>
  );
}
export default ProductsPage;
