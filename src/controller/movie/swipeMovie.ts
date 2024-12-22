
import { Response, NextFunction} from "express";
import {AuthenticatedRequest} from "../../interface/interface";
import {createMovieService, createSwipeService} from "../../factories/classFactory";

const swipeService = createSwipeService()
const movieService = createMovieService()
export const swipeMovie = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const movieId = req.body.movieId
        const movie = await movieService.getMovieById(movieId)
        const user = req.user!
        const liked = req.body.liked
        await swipeService.saveSwipe(user, movie, liked)
        res.status(200).send('swipe saved');
    } catch (error) {
        next(error)
    }
}