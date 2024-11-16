import {PayloadType} from "../../authentification/type/UserPayLoad";
import {SwipeService} from "../services/SwipeService";
import {Request, Response,NextFunction} from "express";
import {SwipeEntity} from "../../movie/entites/SwipeEntity";
interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}
const swipeService  = new SwipeService();
export const swipeMovie = async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
    await swipeService.saveSwipe(req.user!, req.body.movie, req.body.liked)
    res.status(200).send();
}