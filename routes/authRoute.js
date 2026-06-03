import express from "express";
import { signUpController } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/signup", signUpController);

export default authRouter;