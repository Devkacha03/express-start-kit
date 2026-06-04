import "dotenv/config";

const DATABASE_CONFIG = {
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_url: process.env.DATABASE_URL,
};

const JWT_CONFIG = {
  jwt_secret: process.env.JWT_SECRET,
  jwt_issuer: process.env.JWT_ISSUER,
  jwt_audience: process.env.JWT_AUDIENCE,
  jwt_expiresIn: process.env.JWT_EXPIRES_IN || "2h",
  jwt_algorithm: process.env.JWT_ALGORITHM || "HS256",
  jwt_secret_encoded: new TextEncoder().encode(process.env.JWT_SECRET),
};

export { DATABASE_CONFIG, JWT_CONFIG };
