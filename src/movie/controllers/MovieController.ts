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

export const getMovie = async (req: AuthenticatedRequest, res: Response) => {
console.log("getMovies")
    const listTableau =await movieService.getMovies(req.user!);
console.log("listTableau",listTableau.length)
    res.status(200).json({movie: listTableau});
}