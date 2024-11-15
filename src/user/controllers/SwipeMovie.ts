import {PayloadType} from "../../authentification/type/UserPayLoad";
import {SwipeService} from "../services/SwipeService";
import {Request, Response,NextFunction} from "express";
interface AuthenticatedRequest extends Request {
    user?: PayloadType;
}
const swipeService  = new SwipeService();
export const swipeMovie = async (req: AuthenticatedRequest, res: Response,next:NextFunction) => {

}