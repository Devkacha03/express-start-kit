import express from "express";
import { errorHandler, error404Handler } from "./middleware/errorHandlerMiddleware.js"; // middleware/errorhandler.js
import authRouter from "./routes/authRoute.js"; // routes/authRoutes.js
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import morgan from "morgan";

const app = express();
const PORT = 3000;

app.use(express.json()); //middleware for parsing json bodies
app.use(morgan("dev")); // more detailed logging than console.log

app.get("/", (request, response) => {
    console.log(request.url)
    response.send("server running successfully");
});

app.use("/auth", authRouter);

app.use(error404Handler); // 404 handler middleware

app.use(errorHandler); //Global error handler middleware

app.listen(PORT || 8000, () => {
    console.log(`server running on http://localhost:${PORT}`);
});