import {UserRepository} from "../repositories/userRepositories";
import {User} from "../entities/userEntity";
import {hash} from "../../utils/hashing";
import {AlreadyExistsError, EmptyFieldError, UserError} from "../error/userError";
import {UserType} from "../type/userType";
import {checkField} from "../../utils/chekFields";


export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async addUser(userData:UserType): Promise<User> {
        await checkField(userData, this.userRepository);

        userData.password = await hash(userData.password);
         const user = this.createUser(userData);
        return await this.userRepository.saveUser(user);
    }


    private createUser(userData:UserType) {
        const user = new User();
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.password = userData.password;
        user.age = userData.age;
        user.countryId = userData.countryId;
        user.ppPath = userData.ppPath;
        return user;
    }
}
