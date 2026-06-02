import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
    console.log(request.url)
    response.send("server running successfully");
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});