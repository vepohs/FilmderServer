import {MovieServices} from "../../Service/movie/MovieServices";
import {Request, Response, NextFunction} from 'express';
import {AuthenticatedRequest} from "../../interface/interface";
import {SwipeService} from "../../Service/swipe/SwipeService";


const movieService = new MovieServices();
const swipeService = new SwipeService();
export const getMovie = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const listTableau = await movieService.getMovies(req.user!, req.body.listExcluedIds);
        console.log('listTableau')
        console.log(listTableau)
        res.status(200).json({movies: listTableau});
    } catch (error: any) {
        next(error)
    }
}
export const getMovieLiked = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const listUserIds = req.body.listUserIds;
    const listUsersMoviesLiked = await swipeService.getMovieLiked(listUserIds)
    res.status(200).json({listUsersMoviesLiked});
}