import express from "express";
import { error } from "node:console";

const app = express();
const port = 3000;

const rates: Record<string, number> = {
    usd: 1300,
    eur: 1400,
    gbp: 1650
};

app.get("/convert", (req, res) => {
    const { amount, currency } = req.query;

    if (amount === undefined || currency === undefined) {
        return res.json(400).json({
            error: "Both amount and currency are required",
        })
    }

    const validAmount = Number(amount);
    if (!Number.isFinite(validAmount) && validAmount <= 0) {
        return res.status(400).json({
            error: "Provide a valid number greater than 0",
        })
    }

    if (typeof currency != "string" || !(currency.toLowerCase() in rates)) {
        return res.status(400).json({
            error: "Currency must be of usd, eur or gbp",
        })
    }

    const rate = rates[currency.toLowerCase()];


    const convertedAmount = validAmount * rate;

    return res.status(200).json({
        input: {
            amount: validAmount,
            currency: currency.toLowerCase(),
        },
        convertedAmount,
        unit: "RWF",
    })
})

app.listen(port, () => {
    console.log("Server is running on http://localhost:", port);
});