import express from "express";

const app = express();
const port = 3000;

const rates: Record<string, number> = {
    usd: 1300,
    eur: 1400,
    gbp: 1650
};

app.get("/convert", (req, res) => {

})

app.listen(port, () => {
    console.log("Server is running on http://localhost:", port);
});