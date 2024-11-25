import {Request, Response} from "express";
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest} from "../../interface/interface";

const groupService = new GroupService();
export const setGroupPreference = async (req: AuthenticatedRequest, res: Response) => {
    console.log("req.body", req.body);
    await groupService.setGroupPreference(req.body.groupId, req.body.genrePreferenceIds, req.body.providerPreferenceIds);
    res.status(200).json({message: 'Preferences updated'});
}
export const getGroupPreference = async (req: AuthenticatedRequest, res: Response) => {
    console.log("req.query", req.query.groupId);
    const  groupId  = req.query.groupId as string;

    const genrePreference = await groupService.getGroupGenrePreference(groupId);
    const providerPreference = await groupService.getGroupProviderPreference(groupId);
    console.log("UUUUUUUUUUUUUUUUUUUUUI")
    console.log(genrePreference)
    console.log(providerPreference)

    res.status(200).json({genrePreference,providerPreference});
}