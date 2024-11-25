import {MovieServices} from "../../Service/movie/MovieServices";
import {Request, Response, NextFunction} from 'express';
import {AuthenticatedRequest} from "../../interface/interface";


const movieService = new MovieServices();
export const getMovie = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        console.log('req.body.listExcluedIds');
        console.log(req.body.listExcluedIds);
        const listTableau = await movieService.getMovies(req.user!,req.body.listExcluedIds);
        console.log('listTableau');
        console.log(listTableau.map((movie) => movie.id));
        res.status(200).json({movie: listTableau});
    } catch (error: any) {
        next(error)
    }

}