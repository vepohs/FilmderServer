import {GroupRequest} from "../interface/interface";
import {NextFunction,Response} from "express";
import {GroupService} from "../Service/group/groupService";
const groupService = new GroupService();
export const verifyGroup = async (req: GroupRequest,res :Response,next: NextFunction) => {
    try {
        const group = await groupService.getGroupById(req.body.groupId);
        if (!group) {
            throw new Error('User not found');
        }
        req.group = group;
        next();
    } catch (error) {
        next(error);
    }
}