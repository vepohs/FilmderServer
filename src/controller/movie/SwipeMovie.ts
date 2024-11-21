import {SwipeService} from "../../Service/swipe/SwipeService";
import {Request, Response,NextFunction} from "express";
import {AuthenticatedRequest} from "../../interface/interface";

const swipeService  = new SwipeService();
export const swipeMovie = async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {
    await swipeService.saveSwipe(req.user!, req.body.movie, req.body.liked)
    res.status(200).send();
}