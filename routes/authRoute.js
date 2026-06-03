import express from "express";
import { signUpController, signInController } from "../controllers/authController.js";
import { validate } from "../middleware/validate.middleware.js";
import { authUserSchema } from "../validators/auth.validator.js";

const authRouter = express.Router();

authRouter.post("/signup", validate(authUserSchema), signUpController);
authRouter.post("/signin", validate(authUserSchema), signInController);

export default authRouter;