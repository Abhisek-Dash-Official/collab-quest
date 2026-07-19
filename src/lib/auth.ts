import { jwtVerify } from 'jose';

if (!process.env.JWT_SECRET) {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

// Helper function to decode token (Not exported, used internally)
async function decodeToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}

// Just checks if the token belongs to an admin (Returns boolean)
export async function checkIsAdmin(token: string): Promise<boolean> {
  const payload = await decodeToken(token);
  return payload?.role === 'admin';
}

// Gets the UID of any valid user (Returns string or null)
export async function getUserUid(token: string): Promise<string | null> {
  const payload = await decodeToken(token);
  return (payload?.uid as string) || null;
}

// Checks admin AND returns UID (Returns string or null)
export async function getAdminUid(token: string): Promise<string | null> {
  const payload = await decodeToken(token);
  if (payload?.role === 'admin') {
    return (payload?.uid as string) || null;
  }
  return null;
}