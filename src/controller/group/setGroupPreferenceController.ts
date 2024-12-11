import { Response} from "express";
import {GroupRequest} from "../../interface/interface";
import {createGroupService} from "../../factories/ClassFactory";

const groupService = createGroupService()
export const setGroupPreference = async (req: GroupRequest, res: Response) => {

    await groupService.setGroupPreference(req.group!.groupId, req.body.genrePreferenceIds, req.body.providerPreferenceIds);
    res.status(200).json({message: 'Preferences updated'});
}
export const getGroupPreference = async (req: GroupRequest, res: Response) => {

    const group = req.group!;
    const genrePreference = await groupService.getGroupGenrePreference(group);
    const providerPreference = await groupService.getGroupProviderPreference(group);
    res.status(200).json({genrePreference,providerPreference});
}