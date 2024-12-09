import { Response, NextFunction} from 'express';
import {MovieServices} from "../../Service/movie/MovieServices";
import {GroupRequest} from "../../interface/interface";
const movieService = new MovieServices();
export const getGroupMoviesCommon = async (req: GroupRequest, res: Response, next: NextFunction) => {
    try {
        const usersId:number[]= req.body.usersId;
        const movies = await movieService.getSelectionMovieGroup(usersId,req.group!);
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}
