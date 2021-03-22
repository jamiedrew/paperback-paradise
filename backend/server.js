require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const pool = require ("./db");

app.get("/", (req, res) => {
    res.json({ message: "API running"});
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