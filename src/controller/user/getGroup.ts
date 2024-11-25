import {NextFunction, Request, Response} from "express";
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest} from "../../interface/interface";
 const groupService = new GroupService();
export const getGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const group = await groupService.getGroupsByUser(req.user!)
        group ? res.status(200).json({group}) : res.status(200).json({group: []});
    }
    catch (error: any) {
        next(error)
    }

}

