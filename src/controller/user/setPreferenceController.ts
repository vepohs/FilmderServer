import {PreferenceService} from "../../Service/preference/PreferenceService";
import {Request, Response, NextFunction} from "express";
import {AuthenticatedRequest} from "../../interface/interface";
const preferenceService = new PreferenceService();

export const setPreference = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("COUCOUBOB")
    console.log(req.body)
    const genrePreferenceIds: number[] = req.body!.genrePreferenceIds;
    await preferenceService.saveGenrePreference(req.user!.email, genrePreferenceIds);
    const providerPreferenceIds =req.body!.providerPreferenceIds;
    await preferenceService.saveProviderPreference(req.user!.email, providerPreferenceIds);
    res.status(200).json({message: "Preference saved"});
}