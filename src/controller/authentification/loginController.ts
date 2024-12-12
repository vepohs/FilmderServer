import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../Service/authentification/authService";

const authService = new AuthService();
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken, accessToken} = await authService.login(req.body.email, req.body.password);
        const firstName = await authService.getFirstName(req.body.email);
        res.status(200)
            .json({accessToken, firstName, refreshToken});
    } catch (error) {
        next(error)
    }
}


