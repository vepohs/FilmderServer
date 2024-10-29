import {UserRepository} from "../../user/repositories/userRepository";
import {badCredentialsError} from "../error/authError";
import {compare} from "bcrypt";
import {JwtService} from "./jwtService";
import {RefreshTokenEntity} from "../entities/refreshTokenEntity";
import {JwtRepository} from "../repositories/jwtRepository";
import {UserEntity} from "../../user/entities/userEntity";
import {AuthType, PayloadType} from "../type/authType";


export class AuthService {
    private userRepository: UserRepository;
    private jwtService: JwtService;
    private jwtRepository : JwtRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JwtService();
        this.jwtRepository = new JwtRepository();
    }

    async authentification(authData: AuthType): Promise<{ refreshToken: string, accessToken: string }> {
        const user = await this.userRepository.findByEmail(authData.email);

        if (!user)
            throw new badCredentialsError();

        if (!await compare(authData.password, user.password))
            throw new badCredentialsError();

        const payload:PayloadType = { email: user.email, userId: user.id };
        const refreshToken = this.jwtService.generateRefreshToken(payload);
        const accessToken = this.jwtService.generateAccessToken(payload);
        await this.saveTokenInDb(refreshToken, user);

        return {
            refreshToken,
            accessToken
        };
    };

    async logout(refreshToken: string): Promise<void> {
        await this.jwtRepository.deleteToken(refreshToken);
    }

    private async saveTokenInDb(refreshToken: string, user: UserEntity) {
        const refreshTokenObject = new RefreshTokenEntity();
        refreshTokenObject.refreshToken = refreshToken;
        refreshTokenObject.user = user;
        await this.jwtRepository.saveToken(refreshTokenObject);
    }
}