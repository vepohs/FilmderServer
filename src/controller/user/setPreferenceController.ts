
import {Request, Response, NextFunction} from "express";
import {AuthenticatedRequest} from "../../interface/interface";
import {createPreferenceService} from "../../factories/ClassFactory";
const preferenceService = createPreferenceService()

export const setPreference = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user!;
    const genrePreferenceIds: number[] = req.body!.genrePreferenceIds;
    await preferenceService.saveGenrePreference(user, genrePreferenceIds);
    const providerPreferenceIds =req.body!.providerPreferenceIds;
    await preferenceService.saveProviderPreference(user, providerPreferenceIds);
    res.status(200).json({message: "Preference saved"});
}