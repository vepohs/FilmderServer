import jwt from 'jsonwebtoken';
import {TokenRepository} from "../../repository/authentification/tokenRepository";
import {RefreshTokenEntity} from "../../entity/refreshTokenEntity";
import {UserPayloadType} from "../../type/Type";
import {DeleteResult} from "typeorm";
import {
    FailedToDeleteRefreshTokenError,
    FailedToGenerateAccessTokenError, FailedToGenerateRefreshTokenError,
    FailedToSaveRefreshTokenError
} from "../../error/authError";

const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET as string;
const RFRESH_TOKEN_SECRET = process.env.RFRESH_TOKEN_SECRET as string;


const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION as string;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION as string;


export class TokenService {
    constructor(private readonly AuthenticationRepository: TokenRepository) {
    }

    generateAccessToken(payload: UserPayloadType): string {
        try {
            return jwt.sign(payload, ACCES_TOKEN_SECRET, {expiresIn: JWT_ACCESS_EXPIRATION});
        } catch (error) {
            throw FailedToGenerateAccessTokenError;
        }
    }

    generateRefreshToken(payload: UserPayloadType): string {
        try {
            return jwt.sign(payload, RFRESH_TOKEN_SECRET, {expiresIn: JWT_REFRESH_EXPIRATION});
        } catch {
            throw FailedToGenerateRefreshTokenError;
        }
    }

    verifyAccessToken(token: string): UserPayloadType | null {
        try {
            const accessToken = jwt.verify(token, ACCES_TOKEN_SECRET) as UserPayloadType;
            return {email: accessToken.email, userId: accessToken.userId};
        } catch {
            return null;
        }
    }

    verifyRefreshToken(token: string): UserPayloadType | null {
        try {
            const refreshToken = jwt.verify(token, RFRESH_TOKEN_SECRET) as UserPayloadType;
            return {email: refreshToken.email, userId: refreshToken.userId};
        } catch {
            return null;
        }
    }

    async deleteRefreshToken(token: string): Promise<DeleteResult> {
        try {
            return await this.AuthenticationRepository.deleteRefreshToken(token);
        } catch {
            throw new FailedToDeleteRefreshTokenError();
        }
    }

    async saveRefreshToken(token: RefreshTokenEntity) {
        try {
            return await this.AuthenticationRepository.saveToken(token);
        } catch {
            throw new FailedToSaveRefreshTokenError();
        }
    }

}