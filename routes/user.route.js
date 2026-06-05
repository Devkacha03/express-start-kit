import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { userProfileController } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/me", requireAuth, userProfileController);

export default userRoute;
