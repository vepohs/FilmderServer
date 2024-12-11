import {RefreshTokenEntity} from "../../entity/refreshTokenEntity";
import {DeleteResult, Repository} from "typeorm";

export class AuthenticationRepository {
    constructor(private readonly jwtRepository:Repository<RefreshTokenEntity>) {}

    async saveToken(token: RefreshTokenEntity): Promise<RefreshTokenEntity> {
        return  await this.jwtRepository.save(token);
    }

    async deleteRefreshToken(refreshToken: string): Promise<DeleteResult> {
        return await this.jwtRepository.delete({refreshToken});
    }
}