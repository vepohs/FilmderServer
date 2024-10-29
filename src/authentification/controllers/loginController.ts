import {NextFunction, Request, Response} from "express";
import {AuthType} from "../type/authType";
import {AuthService} from "../services/authService";

const authService = new AuthService();
export const login = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const authData: AuthType = getData(req);
        const { refreshToken,authenticationToken } = await authService.authentification(authData);
        res.status(200)
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" })
            .json({authenticationToken});
    }
    catch (error){
        next(error)
    }
};
function getData(req: Request): AuthType {
    return {
        password: req.body.password,
        email: req.body.email
    };
}