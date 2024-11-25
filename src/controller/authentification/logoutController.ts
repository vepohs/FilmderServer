import {Request, Response, NextFunction} from 'express';
import {AuthService} from '../../authentification/services/authService';
import {RefreshTokenError} from "../../authentification/error/authError";

const authService = new AuthService();

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            res.status(400).json({message: 'Refresh token missing'});
            throw new RefreshTokenError();
        }

       const deleteResult = await authService.logout(refreshToken, res);
         deleteResult.affected? res.status(200).json({message: 'Successfully logged out'}): res.status(500).json({message: 'Failed to clear refresh token cookie'});
    } catch (error) {
        next(error);
    }
};
