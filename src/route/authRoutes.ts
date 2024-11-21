import express from 'express';
import {login} from "../controller/authentification/loginController";
import {logout} from "../controller/authentification/logoutController";
import {refreshToken} from "../controller/authentification/refreshTokenController";
import {authMiddleware} from "../middlewares/authMiddleware";
const router = express.Router();
router.delete('/logout',authMiddleware,logout);
router.post('/login',login);
router.post('/refreshToken', refreshToken)
export default router;