import express from "express";
import { errorHandler } from "./middleware/errorHandlerMiddleware.js"; //middleware/errorhandler.js
import authRouter from "./routes/authRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json()); //middleware for parsing json bodies

app.get("/", (request, response) => {
    console.log(request.url)
    response.send("server running successfully");
});

app.use("/auth", authRouter);

app.use(errorHandler); //Global error handler middleware

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});