import {Response, NextFunction} from 'express';
import {AuthenticatedRequest} from "../../interface/interface";
import {createGroupService} from "../../factories/classFactory";

const groupService = createGroupService()
export const groupAdd = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user!;
        const {name} = req.body;
        const group = await groupService.saveGroup(user, name);
        res.status(200).json({message :  `group : ${group.name} added`});
    } catch (error) {
        next(error)
    }
}