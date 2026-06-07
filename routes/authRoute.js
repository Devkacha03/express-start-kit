import express from "express";
import {
  signUpController,
  signInController,
  resetPasswordController,
} from "../controllers/authController.js";
import { validate } from "../middleware/validate.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  authUserSchema,
  resetPasswordSchema,
} from "../validators/auth.validator.js";

const authRouter = express.Router();

authRouter.post("/signup", validate(authUserSchema), signUpController);
authRouter.post("/signin", validate(authUserSchema), signInController);
authRouter.post(
  "/reset-password",
  requireAuth,
  validate(resetPasswordSchema),
  resetPasswordController,
);

export default authRouter;
