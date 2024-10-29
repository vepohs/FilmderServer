import {Repository} from "typeorm";
import {UserEntity} from "../entities/userEntity";
import AppDataSource from "../../dataBase/dataSource";

export class UserRepository {
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async saveUser(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }
}