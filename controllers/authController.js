import { signUpUser, signInUser } from "../services/auth.service.js";

export async function signUpController(req, res, next) {
  try {
    const { newUser, token } = await signUpUser(req.body);

    res.status(201).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error); // passes error to error handler middleware
  }
}

export async function signInController(req, res, next) {
  try {
    const { user, token } = await signInUser(req.body);

    res.status(200).json({
      status: "success",
      token: token,
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error); // passes error to error handler middleware
  }
}
