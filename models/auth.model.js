import mongoose from "mongoose";
import { hashPassword, comparePassword, changedPasswordAfter } from "../utils/password.utils.js";
const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Security: Prevents the password from being returned in queries by default
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    passwordChangedAt: {
        type: Date
    },
    passwordResetToken: String,
    passwordResetExpires: Date,

}, { timestamps: true });

// 1. Pre-Save Middleware: Hashes the password before saving to DB
authSchema.pre("save", hashPassword);

// 2. Instance Method: Verifies password during login
authSchema.methods.comparePassword = comparePassword;

// 3. Instance Method: Check if token was issued before password change
authSchema.methods.changedPasswordAfter = changedPasswordAfter;

// 4. Security: Ensure password is never sent in API responses
authSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

authSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

export const Auth = mongoose.model("Auth", authSchema);