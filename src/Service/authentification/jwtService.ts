import jwt from 'jsonwebtoken';
import {JwtRepository} from "../../repository/authentification/jwtRepository";
import {RefreshTokenEntity} from "../../entity/refreshTokenEntity";
import {UserPayloadType} from "../../type/authType";

const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET as string;
const RFRESH_TOKEN_SECRET = process.env.RFRESH_TOKEN_SECRET as string;
// TODO a voir comment gerer si y a pas de valeur dans .env
// Si on retire complement ACCES_TOKEN_SECRET de .env le code fonctionne quand meme

const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION as string;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION as string;



export class JwtService{
    private jwtRepository:JwtRepository;

    constructor() {
        this.jwtRepository = new JwtRepository();
    }

generateAccessToken(payload: UserPayloadType): string {
    return jwt.sign(payload, ACCES_TOKEN_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
}

 generateRefreshToken(payload: UserPayloadType): string {
    return jwt.sign(payload, RFRESH_TOKEN_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
}

verifyAccessToken(token: string): UserPayloadType | null {
    try {
        const accessToken =  jwt.verify(token, ACCES_TOKEN_SECRET) as UserPayloadType;
        return {email: accessToken.email, userId: accessToken.userId};
    } catch (error) {
       return null;
    }}

 verifyRefreshToken(token: string): UserPayloadType | null {
    try {
        const refreshToken =  jwt.verify(token, RFRESH_TOKEN_SECRET) as UserPayloadType;
        return {email: refreshToken.email, userId: refreshToken.userId};
    } catch (error) {
        return null;
    }}

  async deleteRefreshToken(token: string): Promise<void> {
      await this.jwtRepository.deleteRefreshToken(token);
  }
   async saveToken(token : RefreshTokenEntity) {
       await this.jwtRepository.saveToken(token);
    }
}