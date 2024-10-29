import {UserRepository} from "../../user/repositories/userRepositories";
import {AuthType} from "../type/authType";
import {badCredentialsError} from "../error/authError";
import {compare} from "bcrypt";
import {generateAccessToken, generateRefreshToken} from "./jwtService";

export class AuthService {
    private userRepository: UserRepository;
   // private jwtService: JwtService;

    constructor() {
        this.userRepository = new UserRepository();
    //    this.jwtService = new JwtService();
    }

    async authentification(authData: AuthType): Promise<{ refreshToken: string, authenticationToken: string }> {
        const user = await this.userRepository.findByEmail(authData.email);

        if (!user) {
            throw new badCredentialsError();
        }

        if (!await compare(authData.password, user.password)) {
            throw new badCredentialsError();
        }

        const refreshToken = generateRefreshToken({ email: user.email, userId: user.id });
        const authenticationToken = generateAccessToken({ email: user.email, userId: user.id });

        return {
            refreshToken,
            authenticationToken
        };
    };
}