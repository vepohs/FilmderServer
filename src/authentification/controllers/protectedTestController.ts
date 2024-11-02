import {NextFunction, Request, Response} from "express";
import {RefreshTokenError} from "../error/authError";
import {PayloadType} from "../type/UserPayLoad";
interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

export const test = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {
        res.status(200).json({ message: 'Successfully tested out' });
    } catch (error) {
        next(error);
    }
};
