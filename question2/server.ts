import express from "express";
import { requestLogger } from "./middleware/requestLogger.js";

const app = express();
const port = 4000;

app.use(requestLogger);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the home page"
    });
});

app.get("/users", (req, res) => {
    res.json({
        users: [
            { id: 1, name: "Yves" },
            { id: 2, name: "Daniel" },
            { id: 3, name: "Solomon" }
        ]
    });
});

app.listen((port), () => {
    console.log(`app is running on http://localhost:${port}`);
})
