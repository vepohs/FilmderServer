import {UserRepository} from "../../repository/user/userRepository";
import {UserEntity} from "../../entity/UserEntity";
import {hash} from "../../utils/hashing";
import {checkField} from "../../utils/chekFields";
import {UserType} from "../../type/Type";
import {FailedToSaveUserError, NoUserError} from "../../error/userError";
import {ensureExists} from "../../utils/errorutils";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async addUser(userData: UserType): Promise<UserEntity> {
        try {
            await checkField(userData, this.userRepository);
            userData.password = await hash(userData.password);
            const user = this.createUser(userData);
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

    private createUser(userData: UserType) {
        const user = new UserEntity();
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.password = userData.password;
        user.age = userData.age;
        return user;
    }
}
