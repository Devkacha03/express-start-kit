import {
  signUpUserService,
  signInUserService,
  resetPasswordService,
} from "../services/auth.service.js";

export async function signUpController(req, res, next) {
  try {
    const { newUser, token } = await signUpUserService(req.body);

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
    const { user, token } = await signInUserService(req.body);

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

export async function resetPasswordController(req, res, next) {
  try {
    const { user, token } = await resetPasswordService(req.user.id, req.body);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
}
