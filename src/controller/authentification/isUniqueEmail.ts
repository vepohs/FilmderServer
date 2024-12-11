import {Request, Response, NextFunction} from "express";
import {createUserService} from "../../factories/ClassFactory";

const userService = createUserService();
export const isUniqueEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.query.email as string;
        const existingUser = await userService.existsEmail(email);
        existingUser ? res.json({isUnique: false}) : res.json({isUnique: true});
    } catch (error) {
        next(error);
    }
};
