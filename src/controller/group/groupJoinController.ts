import {NextFunction, Request, Response} from 'express';
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest, GroupRequest, JoinGroupInput} from "../../interface/interface";

const groupService = new GroupService();
export const groupJoin = async (req: GroupRequest, res: Response, next: NextFunction) => {
    try {
        //todo voir si c'est une interface ou un type
        const input: JoinGroupInput = {
            user: req.user!,
            groupId: req.group!.groupId
        }
        await groupService.joinGroup(input) ?
            res.status(200).json({message: "Group joined"}) : res.status(400).json({message: "Group not joined"})
    } catch (error) {
        next(error)
    }
}