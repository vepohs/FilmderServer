import express from 'express';
import {login} from "../controllers/loginController";
import {logout} from "../controllers/logoutController";
const router = express.Router();
router.post('/logout',logout);
router.post('/login',login);
router.post('refreshToken')
export default router;