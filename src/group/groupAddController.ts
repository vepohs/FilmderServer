import {GroupService} from "./groupService";
import {PayloadType} from "../authentification/type/UserPayLoad";
import {Request, Response} from 'express';

interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

interface AddGroupInput {
    user: PayloadType;
    name: string;
}

const groupService = new GroupService();
export const groupAdd = async (req: AuthenticatedRequest, res: Response) => {

    const input: AddGroupInput = {
        user: req.user!,
        name: req.body.name
    }
    const group = await groupService.addGroup(input);
    res.status(200).json({group});
}