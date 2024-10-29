import {addUser} from "../controllers/userController";

import express from 'express';
const router = express.Router();

router.post("/createUser", addUser);
export default router;