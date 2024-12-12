import express from "express";
import {groupAdd} from "../controller/group/groupAddController";
import {groupJoin} from "../controller/group/groupJoinController";
import {getGroupUsers} from "../controller/group/groupMovieLikedController";
import {getGroupPreference, setGroupPreference} from "../controller/group/groupPreferenceController";
import {getGroupMoviesCommon} from "../controller/group/getGroupMoviesCommonController";
import {verifyGroup} from "../middlewares/VerifyGroup";
import {swipeMovieGroup} from "../controller/group/swipeMovieGroup";

const router = express.Router();

router.post('/groupAdd',groupAdd);
router.post('/groupJoin',verifyGroup,groupJoin);
router.post('/getGroupUsers',verifyGroup,getGroupUsers);
router.post('/setGroupPreference',verifyGroup,setGroupPreference);
router.get('/getGroupPreference',verifyGroup,getGroupPreference);
router.post('/getGroupMoviesCommon',verifyGroup,getGroupMoviesCommon);
router.post('/swipeMovieGroup',verifyGroup,swipeMovieGroup);
export default router;
