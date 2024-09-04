import db from '@/db/db';

function getMostPopularProducts(number: number) {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: 'desc' } },
    take: number,
  });
}

export {
  getMostPopularProducts,
};
