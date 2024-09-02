/* eslint-disable import/prefer-default-export */

async function hashPassword(password: string) {
  const textEncoder = new TextEncoder().encode(password);

  const arrayBuffer = await crypto.subtle.digest('SHA-512', textEncoder);

  return Buffer.from(arrayBuffer).toString('base64');
}

async function isValidPassword(password: string, hashedPassword: string | undefined) {
  const providedPasswordHashed = await hashPassword(password);

  return (hashedPassword === providedPasswordHashed);
}

export {
  isValidPassword,
};
