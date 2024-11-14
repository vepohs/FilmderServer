import express from "express";
import movieRoutes from "../../movie/routes/MovieRoutes";
import authRoutes from "../../authentification/routes/authRoutes";
import userRoutes from "./userRoutes";
import {authMiddleware} from "../../middlewares/authMiddleware";
import userRoutesProtected from "./userRoutesProtected";


const router = express.Router();


router.use('/api/movie/protected',authMiddleware, movieRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/users/protected', authMiddleware, userRoutesProtected);

export default router;
