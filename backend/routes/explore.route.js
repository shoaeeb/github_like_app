import express from "express";
import { explorePopularRepos } from "../controllers/explore.controller.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";
import { likeProfile, getLikes } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/repos/:language", explorePopularRepos);
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;
