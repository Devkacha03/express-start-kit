import joi from "joi";

export const authUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(32).required(),
});

export const resetPasswordSchema = joi.object({
  currentPassword: joi.string().min(6).max(32).required(),
  password: joi.string().min(6).max(32).required().invalid(joi.ref('currentPassword')).messages({
    'any.invalid': 'New password and current password cannot be same'
  }),
  confirmPassword: joi.any().valid(joi.ref('password')).required().messages({
    'any.only': 'Password and confirm password do not match'
  }),
});
