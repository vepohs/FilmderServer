import {MovieServices} from "../../Service/movie/MovieServices";
import {Request, Response, NextFunction} from 'express';
import {AuthenticatedRequest} from "../../interface/interface";


const movieService = new MovieServices();
export const getMovie = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const listTableau = await movieService.getMovies(req.user!);
        res.status(200).json({movie: listTableau});
    } catch (error: any) {
        next(error)
    }

}