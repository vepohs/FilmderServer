import {Response, NextFunction} from "express";
import {createGenreService, createProviderService} from "../../factories/ClassFactory";
import {AuthenticatedRequest} from "../../interface/interface";

export const getPreferences = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const genreService = createGenreService()
        const providerService = createProviderService()
        await providerService.saveBestProviders();
        await genreService.saveGenres();
        const genrePreference = await genreService.getGenre();
        const providerPreference = await providerService.getAllProvider();
        res.status(200).json({genrePreference: genrePreference, providerPreference: providerPreference});
    } catch (error) {
        next(error);
    }
};