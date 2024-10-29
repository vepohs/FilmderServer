import {Repository} from "typeorm";
import {User} from "../entities/userEntity";
import AppDataSource from "../../dataBase/dataSource";

export class UserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}