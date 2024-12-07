import {MovieServices} from "../../Service/movie/MovieServices";
import {GroupService} from "../../Service/group/groupService";
import {AuthenticatedRequest, GroupRequest} from "../../interface/interface";
import {NextFunction, Response} from "express";

const movieService = new MovieServices();
const groupService = new GroupService();
export const getGroupMovie = async (req: GroupRequest, res: Response,next:NextFunction) => {
    try {


        const group = req.group;
        const excluedIds = req.body.listExcluedIds;
        const users = await groupService.getAllUsersIdsByGroup(group);
        const movies = await movieService.getMovieForGroup(users, req.user!, id, excluedIds);
        res.status(200).json({movies});
    }
    catch (error) {
        next(error);
    }
}