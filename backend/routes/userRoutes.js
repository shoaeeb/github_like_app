import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
//TODO get Likes
//TODO POST like a profile

export default router;
