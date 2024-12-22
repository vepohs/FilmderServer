import {UserRepository} from "../../repository/user/userRepository";
import {UserEntity} from "../../entity/UserEntity";
import {hash} from "../../utils/hashing";
import {checkField} from "../../utils/chekFields";
import {UserType} from "../../type/Type";
import {FailedToSaveUserError, NoUserError} from "../../error/userError";
import {ensureExists} from "../../utils/errorutils";
import {createEntityFactory} from "../../factories/classFactory";
import {UpdateResult} from "typeorm";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    private readonly factory = createEntityFactory()

    async addUser(userData: UserType): Promise<UserEntity> {
        try {
            await checkField(userData, this.userRepository);
            userData.password = await hash(userData.password);
            const user = this.factory.createUserEntity(userData);
            return await this.userRepository.saveUser(user);
        } catch {
            throw new FailedToSaveUserError();
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findByEmail(email);
        return ensureExists(user, new NoUserError());
    }

    async existsEmail(email: string): Promise<boolean> {
        return await this.userRepository.existsEmail(email);
    }

    async setLastActivity(user: UserEntity): Promise<UpdateResult> {
       return  await this.userRepository.setLastActivity(user);
    }
    async getAllInactiveUser(minutes: number): Promise<UserEntity[]> {
        const users = await this.userRepository.getAllUsers();
        const timeAgo = new Date();
        timeAgo.setMinutes(timeAgo.getMinutes() - minutes);
        const inactiveUsers = users.filter(user =>
            user.lastActivity && new Date(user.lastActivity) < timeAgo
        );
        return inactiveUsers;
    }

}
