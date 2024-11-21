import {NextFunction, Request, Response} from "express";
import {AuthenticatedRequest} from "../interface/interface";


export const verifyAccessToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {
        res.status(200).json({ message: 'Successfully tested out' });
    } catch (error) {
        next(error);
    }
};