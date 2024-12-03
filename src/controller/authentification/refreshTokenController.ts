// authentification/authController.ts

import { Request, Response, NextFunction } from 'express';
import {JwtService} from "../../Service/authentification/jwtService";
import {BadRefreshTokenError, NoRefreshTokenError} from "../../error/authError";


const jwtService = new JwtService();

export const refreshToken = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('coucou');
        console.log(req.headers);
        const refreshToken = req.headers['refreshtoken'];

        console.log(refreshToken);
        if (!refreshToken) {
            throw new NoRefreshTokenError();
        }

        const payload = jwtService.verifyRefreshToken(refreshToken as string); // Assurez-vous que `refreshToken` est une chaîne
        if (!payload) {
            await jwtService.deleteRefreshToken(refreshToken as string);
            throw new BadRefreshTokenError();
        }

        const newAccessToken = jwtService.generateAccessToken(payload);
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
next(error);
    }
};