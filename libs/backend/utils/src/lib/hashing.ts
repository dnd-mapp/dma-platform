import { argon2i, hash, verify } from 'argon2';

export async function hashPassword(password: string, pepper: string) {
    return await hash(password, { timeCost: 8, type: argon2i, secret: Buffer.from(pepper) });
}

export async function verifyPassword(password: string, passwordHash: string, pepper: string) {
    return await verify(passwordHash, password, { secret: Buffer.from(pepper) });
}
