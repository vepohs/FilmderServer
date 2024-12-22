import {NextFunction, Request, Response} from "express";
import {AuthenticatedRequest} from "../../interface/interface";
import {createGroupService} from "../../factories/classFactory";
 const groupService = createGroupService()
export const getGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user!
        const group = await groupService.getGroupsByUser(user)
        group ? res.status(200).json({group}) : res.status(200).json({group: []});
    }
    catch (error: any) {
        next(error)
    }

}

