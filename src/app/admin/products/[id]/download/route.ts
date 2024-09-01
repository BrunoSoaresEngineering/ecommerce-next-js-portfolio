/* eslint-disable import/prefer-default-export */
import db from '@/db/db';
import fs from 'node:fs/promises';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      name: true,
      filePath: true,
    },
  });

  if (!product) return notFound();

  const fileExtension = product.filePath.split('.').pop();
  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachement; filename=${product.name}.${fileExtension}`,
      'Content-Length': size.toString(),
    },
  });
}

export {
  GET,
};
