import { Request, Response, NextFunction } from 'express';
import { JwtService } from "../authentification/services/jwtService";
import {PayloadType} from "../authentification/type/UserPayLoad";
import {BadAccessTokenError, NoAccessTokenError} from "../authentification/error/authError";



interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

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
