
import { GroupRequest} from "../../interface/interface";
import {NextFunction, Response} from "express";
import { createMovieService} from "../../factories/ClassFactory";

const movieService = createMovieService()
export const getGroupMovie = async (req: GroupRequest, res: Response,next:NextFunction) => {
    try {
        const group = req.group!;
        const excludedIds = req.body.listExcluedIds;
        const users =group.users;
        const user = req.user!;
        const movies = await movieService.getMovieForGroup(users, user,group, excludedIds);
        res.status(200).json({movies});
    }
    catch (error) {
        next(error);
    }
}