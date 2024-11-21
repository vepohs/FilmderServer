import { Request, Response, NextFunction } from 'express';
import {UserService} from "../../Service/user/userService";
import {UserType} from "../../type/authType";

const userService = new UserService();

export const addUser = async (req: Request, res: Response , next: NextFunction) => {

    try {
        const userData = getData(req);
        const newUser  = await userService.addUser(userData);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error : any) {
       next(error)
    }
};

function getData(req: Request) {

    const userData: UserType = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: Number(req.body.age),
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        countryId: Number(req.body.countryId),
        ppPath: req.body.ppPath,

    };

    return userData;
}




