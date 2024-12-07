import {Request, Response} from "express";
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest, GroupRequest} from "../../interface/interface";

const groupService = new GroupService();
export const setGroupPreference = async (req: GroupRequest, res: Response) => {

    await groupService.setGroupPreference(req.group!.groupId, req.body.genrePreferenceIds, req.body.providerPreferenceIds);
    res.status(200).json({message: 'Preferences updated'});
}
export const getGroupPreference = async (req: GroupRequest, res: Response) => {

    const  groupId  = req.group!.groupId as string;
    const genrePreference = await groupService.getGroupGenrePreference(groupId);
    const providerPreference = await groupService.getGroupProviderPreference(groupId);
    res.status(200).json({genrePreference,providerPreference});
}