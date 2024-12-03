import {Request, Response, NextFunction} from 'express';
import {AuthService} from '../../Service/authentification/authService';
import {NoRefreshTokenError, RefreshTokenError} from "../../error/authError";

const authService = new AuthService();

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.headers['refreshtoken'];
        if (!refreshToken) {
            throw new NoRefreshTokenError();
        }
       const result = await authService.logout(refreshToken as string);
       result.affected ? res.status(200).json({message: 'Successfully logged out'}) : res.status(500).json({message: 'Failed to clear refresh token cookie'});
    } catch (error) {
        next(error);
    }
};
