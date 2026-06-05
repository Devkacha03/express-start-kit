import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { PASSWORD_HASH_CONFIG } from "../config/configs.variables.js";

const scryptAsync = promisify(scrypt);

export async function hashPassword() {
  if (!this.isModified("password")) return;

  try {
    const salt = randomBytes(PASSWORD_HASH_CONFIG.saltlen).toString("hex");

    // N=16384, r=8, p=5 are secure defaults (adjust based on server CPU)
    const key = await scryptAsync(
      this.password,
      salt,
      PASSWORD_HASH_CONFIG.keylen,
      {
        N: PASSWORD_HASH_CONFIG.N,
        r: PASSWORD_HASH_CONFIG.r,
        p: PASSWORD_HASH_CONFIG.p,
      },
    );

    this.password = `${salt}$${key.toString("hex")}`;

    // If updating an existing user's password, set the changedAt timestamp.
    // Subtracting 1 second ensures the token created after saving is not considered invalid.
    if (!this.isNew) {
      this.passwordChangedAt = new Date(Date.now() - 1000);
    }
  } catch (error) {
    throw error;
  }
}

export async function comparePassword(candidatePassword) {
  if (!this.password) return false;

  const [salt, keyHex] = this.password.split("$");
  if (!keyHex) return false;

  const expectedKey = Buffer.from(keyHex, "hex");

  // Re-calculate hash with the stored salt
  const calculatedKey = await scryptAsync(
    candidatePassword,
    salt,
    expectedKey.length,
    {
      N: PASSWORD_HASH_CONFIG.N,
      r: PASSWORD_HASH_CONFIG.r,
      p: PASSWORD_HASH_CONFIG.p,
    },
  );

  // Use constant-time comparison to prevent timing attacks
  return timingSafeEqual(expectedKey, calculatedKey);
}

export function changedPasswordAfter(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
}
