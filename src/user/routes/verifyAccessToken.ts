import {NextFunction, Request, Response} from "express";
import {PayloadType} from "../../authentification/type/UserPayLoad";

interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

export const verifyAccessToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {
        res.status(200).json({ message: 'Successfully tested out' });
    } catch (error) {
        next(error);
    }
};