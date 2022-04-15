require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();

// session management
const session = require("cookie-session");
const keys = require("./config/keys");

app.use(session({
    keys: [keys.session.cookie],
    maxAge: 24 * 60 * 60 * 1000,
    resave: false,
    saveUninitialized: true
}));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// passport.js
const passport = require("passport");
const flash = require("express-flash");

app.use(passport.initialize());
app.use(passport.session());

const initialisePassport = require("./config/passport-setup");
initialisePassport();

app.use(flash());

// CORS
const cors = require("cors");
app.use(cors());

// database
const pool = require ("./db");

// homepage
app.get("/", async (req, res) => {
    // res.json({ message: "API Running"});
    res.json(req.user);
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