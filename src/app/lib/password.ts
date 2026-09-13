import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Transforma a senha em um hash seguro para armazenar no banco.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara a senha digitada com o hash salvo no banco.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
