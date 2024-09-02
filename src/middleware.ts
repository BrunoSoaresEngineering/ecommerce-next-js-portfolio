/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { NextRequest, NextResponse } from 'next/server';
import { isValidPassword } from './lib/authentication';

async function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');

  if (authHeader == null) {
    return false;
  }

  // const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
  const authCredentials = authHeader.split(' ')[1];
  const [userName, password] = Buffer.from(authCredentials, 'base64').toString().split(':');

  return (
    userName === process.env.ADMIN_USERNAME
    && (await isValidPassword(password, process.env.ADMIN_PASSWORD_HASHED))
  );
}

export async function middleware(req: NextRequest) {
  if (await isAuthenticated(req) === false) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    });
  }
}

export const config = {
  matcher: '/admin/:path*',
};
