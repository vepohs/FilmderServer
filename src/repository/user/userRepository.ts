import {Repository} from "typeorm";
import {UserEntity} from "../../entity/UserEntity";

export class UserRepository {
    constructor(private readonly userRepository: Repository<UserEntity>) {}

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findOne({where: {email}});
        return user
    }

    async existsEmail(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({where: {email}});
        return !!user;
    }

    async saveUser(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }
}