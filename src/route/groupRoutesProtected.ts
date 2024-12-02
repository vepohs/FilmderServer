import express from "express";
import {groupAdd} from "../controller/group/groupAddController";
import {groupJoin} from "../controller/group/groupJoinController";
import {groupMovieLiked} from "../controller/group/groupMovieLikedController";
import {getGroupPreference, setGroupPreference} from "../controller/group/setGroupPreferenceController";
import {getGroupMoviesCommon} from "../controller/group/getGroupMoviesCommonController";

const router = express.Router();

router.post('/groupAdd',groupAdd);
router.post('/groupJoin',groupJoin);
router.get('/groupMovieLiked',groupMovieLiked);
router.post('/setGroupPreference',setGroupPreference);
router.get('/getGroupPreference',getGroupPreference);
router.post('/getGroupMoviesCommon',getGroupMoviesCommon);
export default router;
