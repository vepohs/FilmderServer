import {addUser} from "../controllers/userController";

const express = require("express");
const router = express.Router();

router.post("/createUser", addUser);
export default router;