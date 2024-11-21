import {GroupService} from "../../Service/group/groupService";
import {Request, Response, NextFunction} from 'express';
import {AddGroupInput, AuthenticatedRequest} from "../../interface/interface";

const groupService = new GroupService();
export const groupAdd = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const input: AddGroupInput = {
            user: req.user!,
            name: req.body.name
        }
        const group = await groupService.addGroup(input);
        res.status(200).json({group});
    } catch (error: any) {
        next(error)
    }
}