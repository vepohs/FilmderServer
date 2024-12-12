
import {Request, Response, NextFunction} from 'express';
import {BadRefreshTokenError, NoRefreshTokenError} from "../../error/authError";
import {createTokenService} from "../../factories/ClassFactory";


const tokenService = createTokenService();

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.headers['refreshtoken'];

        if (!refreshToken) {
            throw new NoRefreshTokenError();
        }

        const payload = tokenService.verifyRefreshToken(refreshToken as string);
        if (!payload) {
            await tokenService.deleteRefreshToken(refreshToken as string);
            throw new BadRefreshTokenError();
        }

        const newAccessToken = tokenService.generateAccessToken(payload);
        res.status(200).json({accessToken: newAccessToken});
    } catch (error) {
        next(error);
    }
};