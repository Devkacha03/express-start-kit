import { SignJWT, jwtVerify } from "jose";
import { JWT_CONFIG } from "../config/configs.variables.js";

export const generateToken = async (user) => {
  const payload = Object.entries(JWT_CONFIG.jwt_payload).reduce((acc, [tokenKey, userProp]) => {
    acc[tokenKey] = user[userProp];
    return acc;
  }, {});

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_CONFIG.jwt_algorithm })
    .setIssuedAt()
    .setIssuer(JWT_CONFIG.jwt_issuer)
    .setAudience(JWT_CONFIG.jwt_audience)
    .setExpirationTime(JWT_CONFIG.jwt_expiresIn)
    .sign(JWT_CONFIG.jwt_secret_encoded);
};

export const verifyToken = async (token) => {
  const { payload } = await jwtVerify(token, JWT_CONFIG.jwt_secret_encoded, {
    issuer: JWT_CONFIG.jwt_issuer,
    audience: JWT_CONFIG.jwt_audience,
    algorithms: [JWT_CONFIG.jwt_algorithm],
  });

  return payload;
};
