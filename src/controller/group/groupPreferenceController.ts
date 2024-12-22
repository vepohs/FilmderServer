import {NextFunction, Response} from "express";
import {GroupRequest} from "../../interface/interface";
import {createGroupService} from "../../factories/classFactory";

const groupService = createGroupService()
export const setGroupPreference = async (req: GroupRequest, res: Response, next: NextFunction) => {
    try {


        await groupService.setGroupPreference(req.group!.groupId, req.body.genrePreferenceIds, req.body.providerPreferenceIds);
        res.status(200).json({message: 'Preferences updated'});
    } catch (error) {
        next(error)
    }

}
export const getGroupPreference = async (req: GroupRequest, res: Response, next: NextFunction) => {
    try {

        const group = req.group!;
        const genrePreference = await groupService.getGroupGenrePreference(group);
        const providerPreference = await groupService.getGroupProviderPreference(group);
        res.status(200).json({genrePreference, providerPreference});
    } catch (error) {
        next(error)
    }
}