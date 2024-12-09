import {NextFunction, Request, Response} from 'express';
import {GroupRequest} from "../../interface/interface";
import {GroupService} from "../../Service/group/groupService";
const groupService = new GroupService();
export const getGroupUsers = async (req: GroupRequest, res: Response,next:NextFunction) => {
    try {
        const group =  req.group!;
        const users = await groupService.getAllUsersByGroup(group);
        res.status(200).json(users);
    }
    catch (error: any) {
        next(error)
    }
}