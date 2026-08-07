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
    //Step 1 : Reading data
    const { amount, currency } = req.query;
    //Step 2: Validation
    if (amount === undefined || currency === undefined) {
        return res.json(400).json({
            error: "Both amount and currency are required",
        })
    }

    const validAmount = Number(amount);
    if (!Number.isFinite(validAmount) || validAmount < 0) {
        return res.status(400).json({
            error: "Provide a positive number greater than zero",
        })
    }

    if (typeof currency != "string" || !(currency.toLowerCase() in rates)) {
        return res.status(400).json({
            error: "Currency must be of usd, eur or gbp",
        })
    }
    // Step 3: Get the conversion rate
    const rate = rates[currency.toLowerCase()];
    //Step 4: Performing conversion
    const convertedAmount = validAmount * rate;



})

app.listen(port, () => {
    console.log("Server is running on http://localhost:", port);
});
