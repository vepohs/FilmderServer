import {Request, Response} from "express";
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest} from "../../interface/interface";

const groupService = new GroupService();
export const setGroupPreference = async (req: AuthenticatedRequest, res: Response) => {
    await groupService.setGroupPreference(req.body.groupId, req.body.genreIds, req.body.providerIds);
    res.status(200).json({message: 'Preferences updated'});
}
export const getGroupPreference = async (req: AuthenticatedRequest, res: Response) => {
    const groupId = req.body.groupId;
    const groupGenrePreference = await groupService.getGroupGenrePreference(groupId);
    const groupProviderPreference = await groupService.getGroupProviderPreference(groupId);
    res.status(200).json({groupGenrePreference, groupProviderPreference});
}