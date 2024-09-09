import db from '@/db/db';

function getMostPopularProducts(number: number) {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: 'desc' } },
    take: number,
  });
}

function getNewestProducts(number: number) {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: 'desc' },
    take: number,
  });
}

export {
  getMostPopularProducts,
  getNewestProducts,
};
