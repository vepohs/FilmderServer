// authentification/authController.ts

import {Request, Response, NextFunction} from 'express';
import {BadRefreshTokenError, NoRefreshTokenError} from "../../error/authError";
import {createAuthenticationService} from "../../factories/ClassFactory";


const authenticationService = createAuthenticationService();

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.headers['refreshtoken'];

        if (!refreshToken) {
            throw new NoRefreshTokenError();
        }

        const payload = authenticationService.verifyRefreshToken(refreshToken as string);
        if (!payload) {
            await authenticationService.deleteRefreshToken(refreshToken as string);
            throw new BadRefreshTokenError();
        }

        const newAccessToken = authenticationService.generateAccessToken(payload);
        res.status(200).json({accessToken: newAccessToken});
    } catch (error) {
        next(error);
    }
};