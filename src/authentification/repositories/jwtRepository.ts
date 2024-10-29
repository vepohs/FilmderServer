import {RefreshTokenEntity} from "../entities/refreshTokenEntity";
import {Repository} from "typeorm";
import AppDataSource from "../../dataBase/dataSource";
import {UserType} from "../../user/type/userType";

export class JwtRepository {
    private jwtRepository: Repository<RefreshTokenEntity>;

    constructor() {
        this.jwtRepository = AppDataSource.getRepository(RefreshTokenEntity);
    }

    async findByUser(user:UserType): Promise<RefreshTokenEntity[] | null> {
    return await this.jwtRepository.find({ where: { user } });
    }

    async saveToken(token: RefreshTokenEntity): Promise<RefreshTokenEntity> {
        return await this.jwtRepository.save(token);
    }

    async deleteToken(refreshToken: string): Promise<void> {
        await this.jwtRepository.delete({refreshToken });
    }
}