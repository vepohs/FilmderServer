import {Response, NextFunction} from 'express';
import {BadAccessTokenError, NoAccessTokenError} from "../error/authError";
import {AuthenticatedRequest} from "../interface/interface";
import {createAuthenticationService, createUserService} from "../factories/ClassFactory";

const authenticationService = createAuthenticationService()
const userService = createUserService()
export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1];

        if (!accessToken) throw new NoAccessTokenError();

        const payload = authenticationService.verifyAccessToken(accessToken);

        if (!payload) throw new BadAccessTokenError();

        const user = await userService.findByEmail(payload.email);

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
