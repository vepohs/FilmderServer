import { Request, Response } from 'express';
import {GroupService} from "./groupService";
import {PayloadType} from "../authentification/type/UserPayLoad";
interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

interface JoinGroupInput {
    user: PayloadType;
    groupId: string;
}
export const groupJoin = async (req: AuthenticatedRequest, res: Response) => {

    const groupService = new GroupService();
    const input: JoinGroupInput = {
        user: req.user!,
        groupId: req.body.groupId
    }
    await groupService.joinGroup(input);
    res.status(200).json({message: "Group joined"});
}