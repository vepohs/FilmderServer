
import { GroupRequest} from "../../interface/interface";
import {NextFunction, Response} from "express";
import { createMovieService} from "../../factories/classFactory";

const movieService = createMovieService()
export const getGroupMovie = async (req: GroupRequest, res: Response,next:NextFunction) => {
    try {
        const group = req.group!;
        const excludedMovieIds = req.body.excludedMovieIds;
        const users =group.users;
        const user = req.user!;
        const movies = await movieService.getMovieForGroup(users, user,group, excludedMovieIds);
        res.status(200).json({movies});
    }
    catch (error) {
        next(error);
    }
}