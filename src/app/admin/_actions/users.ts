'use server';

import db from '@/db/db';
import { notFound } from 'next/navigation';

function deleteUser(id: string) {
  const user = db.user.delete({
    where: { id },
  });

  if (user == null) {
    return notFound();
  }

  return user;
}

export {
  deleteUser,
};
