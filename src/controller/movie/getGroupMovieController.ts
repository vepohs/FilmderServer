import {MovieServices} from "../../Service/movie/MovieServices";
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest} from "../../interface/interface";
import {NextFunction, Response} from "express";

const movieService = new MovieServices();
const groupService = new GroupService();
export const getGroupMovie = async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
    try {


        const id = req.body.groupId;
        const excluedIds = req.body.listExcluedIds;
        const users = await groupService.getAllUsersIdsByGroup(id);
        const movies = await movieService.getMovieForGroup(users, req.user!, id, excluedIds);
        res.status(200).json({movies});
    }
    catch (error) {
        next(error);
    }
}