import {MovieServices} from "../services/MovieServices";
import {Request, Response} from 'express';
import {ProviderService} from "../../provider/service/providerService";
import {GenreService} from "../../genre/GenreServices";

const movieService = new MovieServices();
const providerService = new ProviderService();
const genreService = new GenreService();
export const getMovie = async (req: Request, res: Response) => {
    await providerService.saveBestProviders();
    await genreService.saveGenres();
    const listTableau = await movieService.addMovie([878], true, [8]);
    res.status(200).json({message: listTableau});
}