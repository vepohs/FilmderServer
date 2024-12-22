import express from "express";
import movieRoutes from "./movieRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import {authMiddleware} from "../middlewares/authMiddleware";
import userRoutesProtected from "./userRoutesProtected";
import groupRoutesProtected from "./groupRoutesProtected";



const router = express.Router();


router.use('/api/movie/protected',authMiddleware, movieRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/users/protected', authMiddleware, userRoutesProtected);
router.use('/api/group/protected', authMiddleware, groupRoutesProtected);

export default router;
