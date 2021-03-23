require("dotenv").config();
const PORT = 5000;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const pool = require ("./db");

// get a "bestseller list" (the first 10 items) as a default view
app.get("/", async (req, res) => {
    res.json({ message: "API Running"});

    try {

        const bestsellerList = await pool.query(
            "SELECT * FROM books LIMIT 10"
            )

        res.json(bestsellerList.rows);

    } catch (error) {
        res.status(500).send("Server Error");
        console.log(error);
    }

})

// catalogue routes
app.use("/books", require("./routes/books"));
app.use("/genres", require("./routes/genres"));

// user register & login routes
app.use("/auth", require("./routes/auth"))

// user account routes
app.use("/account", require("./routes/account"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})