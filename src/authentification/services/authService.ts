import {UserRepository} from "../../user/repositories/userRepository";
import {BadCredentialsError} from "../error/authError";
import {compare} from "bcrypt";
import {JwtService} from "./jwtService";
import {RefreshTokenEntity} from "../entities/refreshTokenEntity";
import {JwtRepository} from "../repositories/jwtRepository";
import {UserEntity} from "../../user/entities/UserEntity";
import {AuthType} from "../type/authType";
import { Response } from 'express';
import {PayloadType} from "../type/UserPayLoad";
import {UserService} from "../../user/services/userService";
import {DeleteResult} from "typeorm";


export class AuthService {
    private userService: UserService;
    private jwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async login(authData: AuthType): Promise<{ refreshToken: string, accessToken: string }> {
        const user = await this.userService.findByEmail(authData.email);

        if (!user)
            throw new BadCredentialsError();

        if (!await compare(authData.password, user.password))
            throw new BadCredentialsError();

        const payload:PayloadType = { email: user.email, userId: user.id };
        const refreshToken = this.jwtService.generateRefreshToken(payload);
        const accessToken = this.jwtService.generateAccessToken(payload);
        await this.saveTokenInDb(refreshToken, user);

        return {
            refreshToken,
            accessToken
        };
    };

    async logout(refreshToken: string, res:Response): Promise<DeleteResult> {
        // TODO voir si c est grave qu'on vérif pas si c est un bon token genre si il est pas dans la db y a pas d erreur
        this.clearToken(res);
       return await this.jwtService.deleteRefreshToken(refreshToken);
    }

    clearToken(res:Response){
        res.clearCookie('refreshToken');
        //todo a voir si il garde le accesstoken ou si ou doit le tej ou quoi
    }
    private async saveTokenInDb(refreshToken: string, user: UserEntity) {
        const refreshTokenObject = new RefreshTokenEntity();
        refreshTokenObject.refreshToken = refreshToken;
        refreshTokenObject.user = user;
         await this.jwtService.saveToken(refreshTokenObject);
    }


}