import express from "express";
import {groupAdd} from "../controller/group/groupAddController";
import {groupJoin} from "../controller/group/groupJoinController";
import {groupMovieLiked} from "../controller/group/groupMovieLikedController";
import {setGroupPreference} from "../controller/group/setGroupPreferenceController";

const router = express.Router();

router.post('/groupAdd',groupAdd);
router.post('/groupJoin',groupJoin);
router.get('/groupMovieLiked',groupMovieLiked);
router.get('/setGroupPreference',setGroupPreference);
export default router;
