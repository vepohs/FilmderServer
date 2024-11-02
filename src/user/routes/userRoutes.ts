import {addUser} from "../controllers/userController";
import express from 'express';
import {isUniqueEmail} from "../../authentification/controllers/isUniqueEmail";
const router = express.Router();

router.post("/createUser", addUser);
router.post('/isUniqueEmail',isUniqueEmail)
export default router;