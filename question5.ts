import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

interface User {
    username: string,
    email: string,
    password: string
}


const users: User[] = [];

app.post("/register", (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const errors: string[] = [];

    if (!username) {
        errors.push("username is required.");
    }
    if (typeof username !== "string") {
        errors.push("username must be at least 3 characters.");
    }
    if (username.lenght < 3) {
        errors.push("username must be at least 3 chaaracters.");
    }

    if (!email) {
        errors.push("email is required.")
    }
    if (typeof email !== "string") {
        errors.push("email must be a string.")
    }
    if (!email.includes("@") || !email.includes(".")) {
        errors.push("email must contain @ and . ");
    }


    if (!password) {
        errors.push("password is required.")
    }
    if (typeof password !== "string") {
        errors.push("password must be a string.")
    }
    if (password.length < 6) {
        errors.push("password must be at least 6 characters.")
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const newUser = {
        username, email, password,
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword)
})

app.listen(port, () => {
    console.log(`app is running on http://localhost: ${port}`)
})
