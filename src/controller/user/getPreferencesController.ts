import {Request, Response, NextFunction} from "express";
import {GenreService} from "../../Service/genre/GenreServices";
import {ProviderService} from "../../Service/provider/providerService";

export const getPreferences = async (req: Request, res: Response, next: NextFunction) => {


    const genreService = new GenreService()
    const providerService = new ProviderService();
    await providerService.saveBestProviders();
    await genreService.saveGenres();
    const genrePreference = await genreService.getGenre();
    const providerPreference = await providerService.getProvider();
        res.status(200).json({genrePreference: genrePreference , providerPreference: providerPreference});
};