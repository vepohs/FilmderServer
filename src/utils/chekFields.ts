import {UserRepository} from "../repository/user/userRepository";
import {
    AlreadyExistsError,
    ComparePasswordsError,
     NotValidNumberError,
    SyntaxError,
    WeakPasswordError
} from "../error/userError";
import {UserType} from "../type/Type";

export const checkField = async (userData: UserType, userRepository: UserRepository) => {
    checkName(userData.firstName);
    checkName(userData.lastName);
    checkAge(userData.age);
    isEmailValid(userData.email);
    await isEmailAlreadyUsed(userData.email, userRepository);
    comparePasswords(userData.password, userData.confirmPassword);
    checkStrongPassword(userData.password);
}

const checkName = (name:string) => {
    const validName = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/
    if (!name || !validName.test(name))
        throw new SyntaxError("first name or last name");
}

const checkAge =(age:number) => {
    if (typeof age.valueOf() !== 'number' || isNaN(age) || age < 1 || age > 130){
        throw new NotValidNumberError("age");
    }
}


 const isEmailAlreadyUsed= async (email:string, userRepository: UserRepository) =>{
    const existingUser = await userRepository.existsEmail(email);
    if (existingUser)
        throw new AlreadyExistsError("email");
}
const isEmailValid = (email: string) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // TODO : Vérifier que l'email est valide avec une API
    if (!validEmail.test(email))
        throw new SyntaxError("email");
};



const checkStrongPassword =(password:string) => {
    if (!password)
        throw new WeakPasswordError("password");

    const minLength = 8;
    const hasMinLength = password.length >= minLength;
    const hasNumber = /\d/.test(password);
    if(!(hasNumber && hasMinLength))
        throw new WeakPasswordError("password");
}

const comparePasswords =(password:string, confirmPassword:string) => {
    if(!(password ==confirmPassword))
        throw new ComparePasswordsError("confirmPassword")
}


