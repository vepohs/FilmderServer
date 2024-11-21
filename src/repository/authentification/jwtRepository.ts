import {RefreshTokenEntity} from "../../entity/refreshTokenEntity";
import {Repository} from "typeorm";
import AppDataSource from "../../dataBase/dataSource";

export class JwtRepository {
    private jwtRepository: Repository<RefreshTokenEntity>;
//todo voir si il peut y avoir une erreur
    constructor() {
        this.jwtRepository = AppDataSource.getRepository(RefreshTokenEntity);
    }

    async saveToken(token: RefreshTokenEntity): Promise<void> {
        await this.jwtRepository.save(token);
    }

    async deleteRefreshToken(refreshToken: string): Promise<void> {
        await this.jwtRepository.delete({refreshToken});
    }
}