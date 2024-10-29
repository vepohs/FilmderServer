import jwt from 'jsonwebtoken';
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '15m';
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

interface UserPayload {
    userId: number;
    email: string;
}

export function generateAccessToken(payload: UserPayload): string {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
}

// Générer un token de rafraîchissement
export function generateRefreshToken(payload: UserPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
}

// Vérifier le token
export function verifyAccessToken(token: string): UserPayload | null {
    try {
        return jwt.verify(token, JWT_ACCESS_EXPIRATION) as UserPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }}

// Vérifier le token
export function verifyRefreshToken(token: string): UserPayload | null {
    try {
        return jwt.verify(token, JWT_ACCESS_EXPIRATION) as UserPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }}