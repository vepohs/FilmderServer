import {UserType} from "../user/type/userType";
import {UserRepository} from "../user/repositories/userRepository";
import {
    AlreadyExistsError,
    ComparePasswordsError,
    EmptyFieldError, NotValideNumber,
    SyntaxError,
    WeakPasswordError
} from "../user/error/userError";

// todo peut etre qu'on peut faire mieux en utilisant une bibliothèque de validation comme Joi ou validator.js et on a pas clean l'entree de l'utilisateur
export const checkField = async (userData: UserType, userRepository: UserRepository) => {
    checkCountryId(userData)
    checkAge(userData);
    checkForEmptyFields(userData);
    isEmailValid(userData);
    await isEmailAlreadyUsed(userData, userRepository);
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

        if (value === null || value === undefined || (typeof value === 'string' && value.trim().length === 0)) {
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

const checkAge =(userData:UserType) => {
    if (typeof userData.age.valueOf() !== 'number' || isNaN(userData.age) || userData.age < 1 || userData.age > 130){
        throw new NotValideNumber("age");
    }
}
const checkCountryId =(userData:UserType) => {
    if (typeof userData.countryId.valueOf() !== 'number' || isNaN(userData.countryId) || userData.countryId < 1){
        throw new NotValideNumber("countryId");
    }
}
