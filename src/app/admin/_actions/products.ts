'use server';

import { z } from 'zod';
import fs from 'node:fs/promises';
import path from 'node:path';
import db from '@/db/db';
import { notFound, redirect } from 'next/navigation';

const fileSchema = z.instanceof(File, { message: 'Required' });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/'),
  { message: 'Invalid image format' },
);

const addProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, 'Required'),
  image: imageSchema.refine((file) => file.size > 0, 'Required'),
});

const editProductSchema = addProductSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

// eslint-disable-next-line consistent-return
async function addProduct(prevState: unknown, formData: FormData) {
  const validationResult = addProductSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validationResult.success) {
    return validationResult.error.formErrors.fieldErrors;
  }

  const { data } = validationResult;

  await fs.mkdir('products', { recursive: true });
  const filePath = path.join('products', `${crypto.randomUUID()}-${data.file.name}`);
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir(path.join('public', 'products'), { recursive: true });
  const imagePath = path.join('/products', `${crypto.randomUUID()}-${data.image.name}`);
  await fs.writeFile(path.join('public', imagePath), Buffer.from(await data.image.arrayBuffer()));

  await db.product.create({
    data: {
      name: data.name,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
      description: data.description,
      isAvailableForPurchase: false,
    },
  });

  redirect('/admin/products');
}

// eslint-disable-next-line consistent-return
async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const validationResult = editProductSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validationResult.success) {
    return validationResult.error.formErrors.fieldErrors;
  }

  const { data } = validationResult;

  const product = await db.product.findUnique({ where: { id } });
  if (!product) return notFound();

  let { filePath } = product;
  if (data.file && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = path.join('products', `${crypto.randomUUID()}-${data.file.name}`);
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let { imagePath } = product;
  if (data.image && data.image.size > 0) {
    await fs.unlink(path.join('public', product.imagePath));
    imagePath = path.join('/products', `${crypto.randomUUID()}-${data.image.name}`);
    await fs.writeFile(path.join('public', imagePath), Buffer.from(await data.image.arrayBuffer()));
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
      description: data.description,
    },
  });

  redirect('/admin/products');
}

async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
}

// eslint-disable-next-line consistent-return
async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });

  if (product == null) return notFound;

  await fs.unlink(product.filePath);
  await fs.unlink(path.join('public', product.imagePath));
}

export {
  addProduct,
  toggleProductAvailability,
  deleteProduct,
  updateProduct,
};
