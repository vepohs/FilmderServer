import { GroupRequest } from "../interface/interface";
import { NextFunction, Response } from "express";
import {createGroupService} from "../factories/classFactory";

const groupService = createGroupService()

export const verifyGroup = async (req: GroupRequest, res: Response, next: NextFunction) => {
    try {
        const groupId = req.body.groupId || req.query.groupId;

        if (!groupId) {
         throw new Error('Group id is required');
        }

        const group = await groupService.getGroupById(groupId);

        if (!group) {
          throw new Error('Group not found');
        }

        req.group = group;
        next();
    } catch (error) {
        next(error);
    }
};
