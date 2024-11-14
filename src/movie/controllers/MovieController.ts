import {MovieServices} from "../services/MovieServices";
import {Request, Response} from 'express';
import {ProviderService} from "../../provider/service/providerService";
import {GenreService} from "../../genre/GenreServices";
import {UserType} from "../../user/type/userType";
import {PayloadType} from "../../authentification/type/UserPayLoad";

interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}

const movieService = new MovieServices();
const providerService = new ProviderService();
const genreService = new GenreService();
export const getMovie = async (req: AuthenticatedRequest, res: Response) => {
    //await providerService.saveBestProviders();
    //await genreService.saveGenres();
    const listTableau = movieService.getMovies(req.user!);

    res.status(200).json({movie: listTableau});
}