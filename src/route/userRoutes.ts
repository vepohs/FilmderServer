import express from 'express';
import { addUser } from "../controller/user/userController";
import { isUniqueEmail } from "../controller/authentification/isUniqueEmail";
import {getGroup} from "../controller/user/getGroup";

const router = express.Router();

router.post("/createUser", addUser);
router.post("/isUniqueEmail", isUniqueEmail);
router.get("getGroup",getGroup);

export default router;
