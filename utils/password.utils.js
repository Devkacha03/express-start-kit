import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = randomBytes(16).toString("hex");

        // N=16384, r=8, p=5 are secure defaults (adjust based on server CPU)
        const key = await scryptAsync(this.password, salt, 64, { N: 16384, r: 8, p: 5 });

        this.password = `${salt}$${key.toString('hex')}`;

        // If updating an existing user's password, set the changedAt timestamp.
        // Subtracting 1 second ensures the token created after saving is not considered invalid.
        if (!this.isNew) {
            this.passwordChangedAt = Date.now() - 1000;
        }

        next();
    } catch (error) {
        next(error);
    }
}

export async function comparePassword(candidatePassword) {
    if (!this.password) return false;

    const [salt, keyHex] = this.password.split("$");
    const expectedKey = Buffer.from(keyHex, 'hex');

    // Re-calculate hash with the stored salt
    const calculatedKey = await scryptAsync(candidatePassword, salt, expectedKey.length, { N: 16384, r: 8, p: 5 });

    // Use constant-time comparison to prevent timing attacks
    return timingSafeEqual(expectedKey, calculatedKey);
}

export function changedPasswordAfter(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}