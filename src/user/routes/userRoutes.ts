import express from 'express';
import { addUser } from "../controllers/userController";
import { isUniqueEmail } from "../../controller/authentification/isUniqueEmail";

const router = express.Router();

router.post("/createUser", addUser);
router.post("/isUniqueEmail", isUniqueEmail);

export default router;
