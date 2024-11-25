import {Request, Response, NextFunction} from 'express';
import {AuthService} from '../../Service/authentification/authService';
import {RefreshTokenError} from "../../error/authError";

const authService = new AuthService();

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log('refreshToken');
        console.log(refreshToken);
        if (!refreshToken) {
            res.status(400).json({message: 'Refresh token missing'});
            throw new RefreshTokenError();
        }
       const result = await authService.logout(refreshToken, res);

        console.log('result');
        console.log(result);
       result.affected ? res.status(200).json({message: 'Successfully logged out'}) : res.status(500).json({message: 'Failed to clear refresh token cookie'});
    } catch (error) {
        next(error);
    }
};
