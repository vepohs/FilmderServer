import {UserType} from "../user/type/userType";
import {UserRepository} from "../user/repositories/userRepositories";
import {
    AlreadyExistsError,
    ComparePasswordsError,
    EmptyFieldError,
    SyntaxError,
    WeakPasswordError
} from "../user/error/userError";


export const checkField = async (userData: UserType, userRepository: UserRepository) => {
    await isEmailAlreadyUsed(userData, userRepository);
    isEmailValid(userData);
    checkForEmptyFields(userData);
    comparePasswords(userData);
    checkIsStrongPassword(userData);
}

 const isEmailAlreadyUsed= async (userData: UserType, userRepository: UserRepository) =>{
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser)
        throw new AlreadyExistsError("email");
}

const  isEmailValid =(userData: UserType) =>{
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    // TODO : Vérifier que l'email est valide avec api
    if (!isValidEmail(userData.email))
        throw new SyntaxError("email");
}

const checkForEmptyFields = (userData: UserType) => {
    for (const [key, value] of Object.entries(userData)) {
        if (value === null || value === undefined || value.toString().length <= 0) {
            throw new EmptyFieldError(key)
        }
    }
}
const comparePasswords =(userData:UserType) => {
    if(!(userData.password == userData.confirmPassword))
        throw new ComparePasswordsError("confirmPassword")
}

const checkIsStrongPassword =(userData:UserType) => {
    const password = userData.password;
    const minLength = 8;
    const hasMinLength = password.length >= minLength;
    const hasNumber = /\d/.test(password);
    if(!(hasNumber && hasMinLength))
        throw new WeakPasswordError("password");
}