import bcrypt from "bcrypt";

export async function hashPassword(password: any) {
  const hashed = await bcrypt.hash(password, 12);
  return hashed;
}

export async function verifyPassword(password: any, hashedPassword: any) {
  try {
    const verified = await bcrypt.compare(password, hashedPassword);
    return verified;
  } catch (error) {
    console.error(error);
    return false;
  }
}
