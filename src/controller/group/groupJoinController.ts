import {NextFunction, Request, Response} from 'express';
import {GroupRequest} from "../../interface/interface";
import {createGroupService} from "../../factories/classFactory";

const groupService = createGroupService()
export const groupJoin = async (req: GroupRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user!
        const group = req.group!
        await groupService.joinGroup(user, group) ? res.status(200).json({message: "Group joined"}) : res.status(400).json({message: "Group not joined"})
    } catch (error) {
        next(error)
    }
}