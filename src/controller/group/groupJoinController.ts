import {NextFunction, Request, Response} from 'express';
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest, JoinGroupInput} from "../../interface/interface";

const groupService = new GroupService();
export const groupJoin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        //todo voir si c'est une interface ou un type
        const input: JoinGroupInput = {
            user: req.user!,
            groupId: req.body.groupId
        }
        await groupService.joinGroup(input) ?
            res.status(200).json({message: "Group joined"}) : res.status(400).json({message: "Group not joined"})
    } catch (error) {
        next(error)
    }
}