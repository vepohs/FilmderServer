import {UserService} from "../../Service/user/userService";
import {Request, Response, NextFunction} from "express";

const userService = new UserService();
export const isUniqueEmail = async (req: Request, res: Response, next: NextFunction) => {
    const existingUser = await userService.existsEmail(req.body.email);
    existingUser ? res.json({isUnique: false}) : res.json({isUnique: true});
};
