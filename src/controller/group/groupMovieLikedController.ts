import {NextFunction, Request, Response} from 'express';
import {GroupRequest} from "../../interface/interface";

export const getGroupUsers = async (req: GroupRequest, res: Response,next:NextFunction) => {
    try {
        const group =  req.group!;
        const users = group.users
        res.status(200).json(users);
    }
    catch (error: any) {
        next(error)
    }
}