import jwt from 'jsonwebtoken';
import {PayloadType} from "../type/authType";

const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET as string;
const RFRESH_TOKEN_SECRET = process.env.RFRESH_TOKEN_SECRET as string;
// TODO a voir comment gerer si y a pas de valeur dans .env
// Si on retire complement ACCES_TOKEN_SECRET de .env le code fonctionne quand meme

const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;


export class JwtService{

generateAccessToken(payload: PayloadType): string {
    return jwt.sign(payload, ACCES_TOKEN_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
}

// Générer un token de rafraîchissement
 generateRefreshToken(payload: PayloadType): string {
    return jwt.sign(payload, RFRESH_TOKEN_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
}

verifyAccessToken(token: string): PayloadType | null {
    try {
        return jwt.verify(token, ACCES_TOKEN_SECRET) as PayloadType;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }}

// Vérifier le token
 verifyRefreshToken(token: string): PayloadType | null {
    try {
        return jwt.verify(token, RFRESH_TOKEN_SECRET) as PayloadType;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }}
}