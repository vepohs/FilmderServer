import { Request, Response, NextFunction } from 'express';
import { JwtService } from "../authentification/services/jwtService";
import {PayloadType} from "../authentification/type/UserPayLoad";
import {TokenExpiredError} from "jsonwebtoken";
import {BadRefreshToken, NoPayload} from "../authentification/error/authError";



// Étendre l'interface Request pour inclure le payload
interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

const jwtservice = new JwtService();

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        const accessToken = req.body.accessToken;
        const payload = jwtservice.verifyAccessToken(accessToken);
        if(!payload){
            const refreshToken = req.body.refreshToken
            const refreshPayload = jwtservice.verifyRefreshToken(refreshToken);

            if(!refreshPayload)
                throw new BadRefreshToken();

          const newAccessToken = jwtservice.generateAccessToken(refreshPayload);
            res.status(201).json({message: newAccessToken});
        }

        if (payload)
            req.user = payload ;
        else throw new NoPayload()

        next();
    } catch (error) {
        next(error);
    }
};
