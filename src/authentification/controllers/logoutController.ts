
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token missing' });
        }
        await authService.logout(refreshToken);
        // a voir si l'access est dans cookie
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');

        res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
        next(error);
    }
};
