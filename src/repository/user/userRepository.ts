import {Repository} from "typeorm";
import {UserEntity} from "../../entity/UserEntity";
import AppDataSource from "../../dataBase/dataSource";
import {NoUserError} from "../../error/userError";

export class UserRepository {
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({where: {email}});
            if (user) return user
            else throw new NoUserError();
        }
        catch (error){
            //todo finir
            throw new  NoUserError()
        }
    }

    async saveUser(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }
}