import joi from "joi";

export const authUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(32).required(),

});

