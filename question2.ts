import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();
const port = 4000;

function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const start = Date.now();

    res.on("finish", () => {
        const responseTime = Date.now() - start;
        const timestamp = new Date().toISOString();

        console.log(`[${timestamp}] ${req.method} ${req.url} - ${responseTime}ms`)
    });

    next();
}

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

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`);
})
