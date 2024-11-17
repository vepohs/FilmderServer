// authentification/authController.ts

import { Request, Response, NextFunction } from 'express';
import {JwtService} from "../../authentification/services/jwtService";
import {BadRefreshTokenError, NoRefreshTokenError} from "../../authentification/error/authError";


const jwtService = new JwtService();

export const refreshToken = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            throw new NoRefreshTokenError();

        const payload = jwtService.verifyRefreshToken(refreshToken);
        if (!payload) {
          await jwtService.deleteRefreshToken(refreshToken);
            throw new BadRefreshTokenError();
        }
        const newAccessToken = jwtService.generateAccessToken(payload);
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        next(error);
    }
};
