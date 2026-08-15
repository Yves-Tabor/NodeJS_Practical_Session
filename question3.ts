import express from "express"

const app = express();
const port = 5000;

app.use(express.json());

interface Todo {
    id: number,
    title: string,
    completed: boolean,
}

let todos: Todo[] = [];
let nextId = 1;

app.post("/todos", (req, res) => {
    const { title } = req.body;

    if (typeof title === "string" && title.trim() === "") {
        return res.status(400).json({
            error: "Provide a valid title that must be a non-empty string."
        });
    }

    const todo: Todo = {
        id: nextId++,
        title,
        completed: false
    };

    todos.push(todo);
    res.status(201).json(todo);
});

app.get("/todos", (req, res) => {
    res.json(todos)
});

app.patch("/todos/:id", (req, res) => {
    const id: number = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            error: `Task with id ${id} not found.`,
        });
    }
    todo.completed = !todo.completed;
    res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
    const id: number = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            error: "Task not found",
        })
    }

    todos = todos.filter(todo => todo.id === id);
    res.json({
        message: `Todo deleted successfully.`,
        id: id,
        todo: todo
    })
});

app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`);
})