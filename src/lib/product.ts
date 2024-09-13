import db from '@/db/db';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

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

async function createDownloadLink(productId: string) {
  const downloadVerification = await db.downloadVerification.create({
    data: {
      productId,
      expiresAt: new Date(Date.now() + DAY_IN_MILLISECONDS),
    },
  });
  return downloadVerification.id;
}

export {
  getMostPopularProducts,
  getNewestProducts,
  createDownloadLink,
};
