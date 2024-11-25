import {UserRepository} from "../../repository/user/userRepository";
import {UserEntity} from "../../entity/UserEntity";
import {hash} from "../../utils/hashing";
import {checkField} from "../../utils/chekFields";
import {UserType} from "../../type/authType";


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
