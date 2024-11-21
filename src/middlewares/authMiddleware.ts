import { Request, Response, NextFunction } from 'express';
import { JwtService } from "../Service/authentification/jwtService";
import {BadAccessTokenError, NoAccessTokenError} from "../error/authError";
import {AuthenticatedRequest} from "../interface/interface";
const jwtservice = new JwtService();

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];
        if (!accessToken)
            throw new NoAccessTokenError();

        const payload = jwtservice.verifyAccessToken(accessToken);

        if(!payload)
            throw new BadAccessTokenError();

        req.user = payload;
        next();
    } catch (error) {
        next(error);
    }
};
