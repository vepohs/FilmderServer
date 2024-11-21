import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../Service/authentification/authService";

const authService = new AuthService();
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken, accessToken} = await authService.login(req.body.email, req.body.password);
        //todo en prod activer les sécuritès
        res.status(200)
            .cookie("refreshToken", refreshToken, {httpOnly: false, secure: false, sameSite: "none"})
            .json({accessToken});
    } catch (error) {
        next(error)
    }
}


