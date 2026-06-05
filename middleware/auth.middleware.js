import { verifyToken } from "../utils/jwt.utils.js";
import { getUserById } from "../services/auth.service.js";

export const requireAuth = async (req, res, next) => {
  try {
    const requestHeader = req.headers.authorization;
    if (!requestHeader?.startsWith("Bearer "))
      return res.status(401).json({ error: "Missing authorization header" });

    const token = requestHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token not found" });

    // 1. Verify token
    const decoded = await verifyToken(token);

    // 2. Check if user still exists
    const currentUser = await getUserById(decoded.user_id);
    if (!currentUser) {
      return res
        .status(401)
        .json({ error: "The user belonging to this token no longer exists" });
    }

    // 3. Check if user changed password after the token was issued
    if (decoded.iat && currentUser.changedPasswordAfter(decoded.iat))
      return res.status(401).json({
        error: "User recently changed password! Please log in again.",
      });

    // 4. Grant access to protected routew
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      return res.status(401).json({ error: "Token expired" });
    }
    if (
      error.code === "ERR_JWS_INVALID" ||
      error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED"
    ) {
      return res.status(401).json({ error: "Invalid token" });
    }
    next(error);
  }
};
