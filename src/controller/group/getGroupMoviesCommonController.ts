import {Request, Response, NextFunction} from 'express';
import {MovieServices} from "../../Service/movie/MovieServices";
const movieService = new MovieServices();
export const getGroupMoviesCommon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = req.body.gourpId;
        const movies = await movieService.getSelectionMovieGroup(groupId);
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}