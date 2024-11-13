import {addUser} from "../controllers/userController";
import express from 'express';
import {isUniqueEmail} from "../../authentification/controllers/isUniqueEmail";
//import {preferenceGenre} from "../controllers/PreferenceController";
const router = express.Router();

router.post("/createUser", addUser);
router.post('/isUniqueEmail',isUniqueEmail)
//router.post('preferencesGenre',preferenceGenre)
export default router;