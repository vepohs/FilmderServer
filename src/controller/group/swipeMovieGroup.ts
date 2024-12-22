import {Response, NextFunction} from "express";
import {GroupRequest} from "../../interface/interface";
import {
    createMovieService,
    createSwipeMovieGroupService
} from "../../factories/classFactory";

const swipeMovieGroupService = createSwipeMovieGroupService()
const movieService = createMovieService()
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