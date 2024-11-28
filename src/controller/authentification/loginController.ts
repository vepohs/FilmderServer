import {NextFunction, Request, Response} from "express";
import {AuthService} from "../../Service/authentification/authService";
import {JwtService} from "../../Service/authentification/jwtService";

const authService = new AuthService();
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {refreshToken, accessToken} = await authService.login(req.body.email, req.body.password);
        //todo en prod activer les sécuritès
        const firstName = await authService.getFirstName(req.body.email);
        res.status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({accessToken, firstName});

    } catch (error) {
        next(error)
    }
}


