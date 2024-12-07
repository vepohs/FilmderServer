import express from "express";
import {groupAdd} from "../controller/group/groupAddController";
import {groupJoin} from "../controller/group/groupJoinController";
import {getGroupUsers} from "../controller/group/groupMovieLikedController";
import {getGroupPreference, setGroupPreference} from "../controller/group/setGroupPreferenceController";
import {getGroupMoviesCommon} from "../controller/group/getGroupMoviesCommonController";
import {verifyGroup} from "../middlewares/VerifyGroup";

const router = express.Router();

router.post('/groupAdd',groupAdd);
router.post('/groupJoin',verifyGroup,groupJoin);
router.get('/getGroupUsers',verifyGroup,getGroupUsers);
router.post('/setGroupPreference',verifyGroup,setGroupPreference);
router.get('/getGroupPreference',verifyGroup,getGroupPreference);
router.post('/getGroupMoviesCommon',verifyGroup,getGroupMoviesCommon);
export default router;
