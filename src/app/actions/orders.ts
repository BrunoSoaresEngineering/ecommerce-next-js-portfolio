/* eslint-disable import/prefer-default-export */

'use server';

import db from '@/db/db';

async function userOrderExists(email: string, productId: string) {
  const order = await db.order.findFirst({
    where: { user: { email }, productId },
    select: { id: true },
  });

  return order != null;
}

export {
  userOrderExists,
};
