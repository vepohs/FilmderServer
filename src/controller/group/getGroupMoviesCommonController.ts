import {Request, Response, NextFunction} from 'express';
import {MovieServices} from "../../Service/movie/MovieServices";
import {GroupService} from "../../Service/group/groupService";
const movieService = new MovieServices();
const groupService = new GroupService();
export const getGroupMoviesCommon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = req.body.groupId;
        const usersId= await groupService.getAllUsersIdsByGroup(groupId);
        const movies = await movieService.getSelectionMovieGroup(usersId);
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}