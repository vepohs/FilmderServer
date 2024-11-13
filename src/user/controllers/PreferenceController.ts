import {PayloadType} from "../../authentification/type/UserPayLoad";
import {PreferenceService} from "../services/PreferenceService";
import {Request, Response, NextFunction} from "express";


interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

const preferenceService = new PreferenceService();
export const preferenceGenre = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const preference: number[] = req.body!.genrePreference;
    await preferenceService.saveGenrePreference(req.user!.email, preference);
    res.status(200).json({message: "Preference saved"});
}