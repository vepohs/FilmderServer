import {Response, NextFunction} from 'express';
import {AuthenticatedRequest} from "../../interface/interface";
import {createMovieService, createSwipeService} from "../../factories/classFactory";


const movieService = createMovieService()
const swipeService = createSwipeService()
export const getMovie = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user!;
        const listExcludedIds = req.body.excludedMovieIds;
        const listTableau = await movieService.getMovies(user, listExcludedIds);
        res.status(200).json({movies: listTableau});
    } catch (error) {
        next(error)
    }
}
export const getMovieLiked = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const listUserIds = req.body.listUserIds;
        const listUsersMoviesLiked = await swipeService.getUsersMovieLiked(listUserIds)
        res.status(200).json({listUsersMoviesLiked});
    } catch (error) {
        next(error)
    }
}