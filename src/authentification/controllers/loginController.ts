import {NextFunction, Request, Response} from "express";
import {AuthType} from "../type/authType";
import {AuthService} from "../services/authService";

const authService = new AuthService();
export const login = async (req: Request, res: Response , next: NextFunction) => {
    try {
        const authData: AuthType = getData(req);
        const { refreshToken,accessToken } = await authService.login(authData);
        res.status(200)
            .cookie("refreshToken", refreshToken, { httpOnly: false, secure: false, sameSite: "none" })
            .json({accessToken, refreshToken});
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