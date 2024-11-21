
import {BadCredentialsError} from "../../error/authError";
import {compare} from "bcrypt";
import {JwtService} from "./jwtService";
import {RefreshTokenEntity} from "../../entity/refreshTokenEntity";
import {UserEntity} from "../../entity/UserEntity";
import {Response} from 'express';
import {UserService} from "../user/userService";
import {UserPayloadType} from "../../type/authType";


export class AuthService {
    private userService: UserService;
    private jwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async login(email: string, password: string): Promise<{ refreshToken: string, accessToken: string }> {
        const user = await this.userService.findByEmail(email);
        if (!await compare(password, user.password))
            throw new BadCredentialsError();
//todo voir si il faut un try catch ici qui throw une erreur
        const payload: UserPayloadType = {email: user.email, userId: user.id};
        const refreshToken = this.jwtService.generateRefreshToken(payload);
        const accessToken = this.jwtService.generateAccessToken(payload);
        await this.saveTokenInDb(refreshToken, user);

        return {
            refreshToken,
            accessToken
        };
    };

    async logout(refreshToken: string, res: Response): Promise<void> {
        this.clearToken(res);
        await this.jwtService.deleteRefreshToken(refreshToken);
    }

    clearToken(res: Response) {
        res.clearCookie('refreshToken');
        //todo cleaer acces token
    }

    private async saveTokenInDb(refreshToken: string, user: UserEntity) {
        const refreshTokenEntity = new RefreshTokenEntity();
        refreshTokenEntity.refreshToken = refreshToken;
        refreshTokenEntity.user = user;
        await this.jwtService.saveToken(refreshTokenEntity);
    }


}