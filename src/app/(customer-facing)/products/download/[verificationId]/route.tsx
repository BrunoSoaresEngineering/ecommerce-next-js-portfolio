import fs from 'node:fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

type GetParams = {
  params: {
    verificationId: string
  }
}

export async function GET(req: NextRequest, { params: { verificationId } }: GetParams) {
  const downloadVerification = await db.downloadVerification.findUnique({
    where: {
      id: verificationId,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      product: {
        select: {
          name: true,
          filePath: true,
        },
      },
    },
  });

  if (downloadVerification == null) {
    return NextResponse.redirect(new URL('/products/download/expired', req.url));
  }

  const filePromise = fs.readFile(downloadVerification.product.filePath);
  const sizePromise = fs.stat(downloadVerification.product.filePath);
  const [file, { size }] = await Promise.all([filePromise, sizePromise]);
  const fileExtension = downloadVerification.product.filePath.split('.').pop();

  const contentDisposition = `attachment;\
   filename="${downloadVerification.product.name}.${fileExtension}"`;

  return new NextResponse(file, {
    headers: {
      'Content-Length': size.toString(),
      'Content-Disposition': contentDisposition,
    },
  });
}
