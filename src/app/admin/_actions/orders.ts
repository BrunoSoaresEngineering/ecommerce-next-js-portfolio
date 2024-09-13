'use server';

import { notFound } from 'next/navigation';
import db from '@/db/db';

async function deleteOrder(id: string) {
  const order = await db.order.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
}

export {
  deleteOrder,
};
