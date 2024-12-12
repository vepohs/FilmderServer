import {BadCredentialsError, FailedToSaveRefreshTokenError} from "../../error/authError";
import {compare} from "bcrypt";
import {RefreshTokenEntity} from "../../entity/refreshTokenEntity";
import {UserEntity} from "../../entity/UserEntity";
import {UserPayloadType} from "../../type/Type";
import {DeleteResult} from "typeorm";
import {createTokenService, createUserService} from "../../factories/ClassFactory";


export class AuthService {
    private tokenService = createTokenService();
    private userService = createUserService();


    async login(email: string, password: string): Promise<{ refreshToken: string, accessToken: string }> {
        const user = await this.userService.findByEmail(email);
        if (!await compare(password, user.password))
            throw new BadCredentialsError();
        //todo voir si il faut un try catch ici qui throw une erreur
        const payload: UserPayloadType = {email: user.email, userId: user.id};
        const refreshToken = this.tokenService.generateRefreshToken(payload);
        const accessToken = this.tokenService.generateAccessToken(payload);
        await this.saveTokenInDb(refreshToken, user);
        return {
            refreshToken,
            accessToken
        };
    };

    async logout(refreshToken: string): Promise<DeleteResult> {
        return await this.tokenService.deleteRefreshToken(refreshToken);
    }


    private async saveTokenInDb(refreshToken: string, user: UserEntity) {
        try {
            const refreshTokenEntity = new RefreshTokenEntity();
            refreshTokenEntity.refreshToken = refreshToken;
            refreshTokenEntity.user = user;
            await this.tokenService.saveRefreshToken(refreshTokenEntity);
        } catch  {
            throw new FailedToSaveRefreshTokenError()
        }
    }


    async getFirstName(email: string) {
        return (await this.userService.findByEmail(email)).firstName;
    }
}