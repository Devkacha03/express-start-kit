import express from "express";
import {
  errorHandler,
  error404Handler,
} from "./middleware/errorHandlerMiddleware.js"; // middleware/errorhandler.js
import authRouter from "./routes/authRoute.js"; // routes/authRoutes.js
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import { dbConnect } from "./config/config.js";
import { APP_CONFIG } from "./config/configs.variables.js";
import userRoute from "./routes/user.route.js";
import morgan from "morgan";

const app = express();

app.use(express.json()); //middleware for parsing json bodies

if (APP_CONFIG.node_env === "production")
  app.use(morgan("combined")); // Standard Apache combined log output
else app.use(morgan("dev"));

app.get("/", (request, response) => {
  console.log(request.url);
  response.send("server running successfully");
});

app.use("/auth", authRouter);
app.use("/user", userRoute);

app.use(error404Handler); // 404 handler middleware

app.use(errorHandler); //Global error handler middleware

dbConnect();

app.listen(APP_CONFIG.port, () => {
  console.log(`server running on http://localhost:${APP_CONFIG.port}`);
});
