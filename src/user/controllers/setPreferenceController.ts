import {PayloadType} from "../../authentification/type/UserPayLoad";
import {PreferenceService} from "../services/PreferenceService";
import {Request, Response, NextFunction} from "express";
import {ProviderService} from "../../provider/service/providerService";
import {GenreService} from "../../genre/GenreServices";


interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}
const preferenceService = new PreferenceService();
//todo
export const setPreference = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const genrePreferenceIds: number[] = req.body!.genrePreferenceIds;
    await preferenceService.saveGenrePreference(req.user!.email, genrePreferenceIds);
    const providerPreferenceIds =req.body!.providerPreferenceIds;
    await preferenceService.saveProviderPreference(req.user!.email, providerPreferenceIds);
    res.status(200).json({message: "Preference saved"});
}