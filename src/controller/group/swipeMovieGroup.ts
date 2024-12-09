import {Response, NextFunction} from "express";
import {GroupRequest} from "../../interface/interface";
import {SwipeMovieGroupService} from "../../Service/group/swipeMovieGroupService";
import {MovieServices} from "../../Service/movie/MovieServices";

const swipeMovieGroupService = new SwipeMovieGroupService();
const movieService = new MovieServices();
export const swipeMovieGroup = async (req: GroupRequest, res: Response, next: NextFunction) => {
    try {
        const movieId = req.body.movieId
        const movie = await movieService.getMovieById(movieId)
        await swipeMovieGroupService.saveSwipeMovieGroup(req.group!, movie, req.body.liked)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
}