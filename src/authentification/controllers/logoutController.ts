
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import {RefreshTokenError} from "../error/authError";

const authService = new AuthService();

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
             res.status(400).json({ message: 'Refresh token missing' });
            throw new RefreshTokenError();
        }
        await authService.logout(refreshToken);

        authService.clearToken(res);
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        next(error);
    }
};
