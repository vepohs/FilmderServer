import {Request, Response, NextFunction} from 'express';
import {MovieServices} from "../../Service/movie/MovieServices";
import {GroupService} from "../../Service/group/groupService";
const movieService = new MovieServices();
export const getGroupMoviesCommon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usersId:number[]= req.body.usersId;
        const movies = await movieService.getSelectionMovieGroup(usersId);
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}
