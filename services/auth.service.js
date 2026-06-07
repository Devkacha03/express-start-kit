import { Auth } from "../models/auth.model.js";
import { generateToken } from "../utils/jwt.utils.js";

// signup service
export const signUpUserService = async (userData) => {
  const newUser = await Auth.create(userData);

  newUser.password = undefined;
  newUser.createdAt = undefined;
  newUser.updatedAt = undefined;
  newUser.__v = undefined;

  const token = await generateToken({
    id: newUser._id.toString(),
    email: newUser.email,
  });

  return { newUser, token };
};

// signin service
export const signInUserService = async (userData) => {
  const { email, password } = userData;

  const user = await Auth.findOne({ email }).select(
    "+password -createdAt -updatedAt",
  );

  if (!user) throw new Error("Invalid email");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = await generateToken({
    id: user._id.toString(),
    email: user.email,
  });

  return { user, token };
};

export const getUserById = async (id) => {
  const user = await Auth.findById(id);

  if (!user) throw new Error("Invalid user");

  return user;
};

// reset password service
export const resetPasswordService = async (userId, userBody) => {
  const { currentPassword, password } = userBody;

  const user = await Auth.findById(userId).select("+password");

  const isCurrentPasswordValid = await user.comparePassword(currentPassword);

  if (!isCurrentPasswordValid) throw new Error("Invalid current password");

  user.password = password;

  await user.save();

  user.password = undefined;
  user.__v = undefined;

  const token = await generateToken({
    id: user._id.toString(),
    email: user.email,
  });

  return { user, token };
};
