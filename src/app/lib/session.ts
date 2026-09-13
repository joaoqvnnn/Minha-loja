import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./prisma";

const COOKIE_NAME = "session";
const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-troque-em-producao-min-32-chars"
);
const DURATION_DAYS = 7;

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: string;
};

/**
 * Cria uma sessão para o usuário logado (cookie assinado).
 */
export async function createSession(payload: SessionPayload): Promise<void> {
  const expiresAt = new Date(Date.now() + DURATION_DAYS * 24 * 60 * 60 * 1000);

  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${DURATION_DAYS}d`)
    .sign(SECRET);

  const session = await prisma.session.create({
    data: {
      userId: payload.userId,
      token,
      expiresAt
    }
  });

  cookies().set(COOKIE_NAME, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/"
  });
}

/**
 * Lê a sessão atual (se existir e for válida).
 */
export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET);

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) return null;
    if (session.user.blocked) return null;

    return {
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role
    };
  } catch {
    return null;
  }
}

/**
 * Encerra a sessão atual.
 */
export async function destroySession(): Promise<void> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }
  cookies().delete(COOKIE_NAME);
}
