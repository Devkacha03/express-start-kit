import { Auth } from "../models/auth.model.js";
import { generateToken } from "../utils/jwt.utils.js";

// signup service
export const signUpUser = async (userData) => {
  const newUser = await Auth.create(userData);

  const token = await generateToken({ id: newUser._id.toString(), email: newUser.email });

  return { newUser, token };
};

// signin service
export const signInUser = async (userData) => {
  const { email, password } = userData;

  const user = await Auth.findOne({ email }).select(
    "-password -createdAt -updatedAt",
  );

  if (!user) throw new Error("Invalid email");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = await generateToken({ id: user._id.toString(), email: user.email });

  return { user, token };
};

export const getUserById = async (id) => {
  return await Auth.findById(id);
};
