import {UserRepository} from "../../repository/user/userRepository";
import {UserEntity} from "../../entity/UserEntity";
import {hash} from "../../utils/hashing";
import {checkField} from "../../utils/chekFields";
import {UserType} from "../../type/Type";


export class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async addUser(userData:UserType): Promise<UserEntity> {
        await checkField(userData, this.userRepository);

        userData.password = await hash(userData.password);
         const user = this.createUser(userData);
        return await this.userRepository.saveUser(user);
    }
    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findByEmail(email);
    }
    async existsEmail(email: string): Promise<boolean> {
        return await this.userRepository.existsEmail(email);
    }


    private createUser(userData:UserType) {
        const user = new UserEntity();
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.password = userData.password;
        user.age = userData.age;
        return user;
    }
}//todo d
