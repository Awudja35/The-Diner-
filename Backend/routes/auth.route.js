import express from "express";

import {
  Login,
  Logout,
  Signup,
  getProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/profile", protectRoute, getProfile);

export default router;
