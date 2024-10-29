import express from 'express';
import {login} from "../controllers/loginController";
const router = express.Router();
router.post('/login',login);
router.post('/logout')
router.post('refreshToken')
export default router;