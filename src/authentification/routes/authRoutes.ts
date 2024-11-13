import express from 'express';
import {login} from "../controllers/loginController";
import {logout} from "../controllers/logoutController";
import {refreshToken} from "../controllers/refreshTokenController";
import {authMiddleware} from "../../middlewares/authMiddleware";
const router = express.Router();
router.post('/logout',authMiddleware,logout);
router.post('/login',login);
router.post('/refreshToken', refreshToken)
export default router;