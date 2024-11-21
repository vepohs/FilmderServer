import {Response, Request, NextFunction} from "express";
import {PreferenceUserService} from "../../Service/preference/PreferenceUserService";
import {AuthenticatedRequest} from "../../interface/interface";

export const getUserPreference = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const preferenceUserService = new PreferenceUserService();
    const genreUserPreference = await preferenceUserService.getGenrePreference(req.user!);
    const providerUserPreference = await preferenceUserService.getProviderPreference(req.user!);
    res.status(200).json({genrePreference: genreUserPreference, providerPreference: providerUserPreference});
}