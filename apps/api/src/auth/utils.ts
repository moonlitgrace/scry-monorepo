import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPass(pass: string) {
  return await bcrypt.hash(pass, SALT_ROUNDS);
}

export async function comparePass(pass: string, hashedPass: string) {
  return await bcrypt.compare(pass, hashedPass);
}
