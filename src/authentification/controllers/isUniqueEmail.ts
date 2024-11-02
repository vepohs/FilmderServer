import {UserService} from "../../user/services/userService";
import { Request, Response} from "express";

const userService = new UserService();
export const isUniqueEmail = async (req: Request, res: Response) => {
    const existingUser = await userService.findByEmail(req.body.email);
    if (existingUser)
        res.json({isUnique:false});
    else
    res.json({isUnique:true});
};
