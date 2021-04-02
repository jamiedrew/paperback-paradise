const passport = require("passport");

const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

const isAuthorised = require("../utilities/authorisationCheck");

// LOGIN

router.post("/login", passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/auth/register",
    failureFlash: false
}))

router.post("/logout", (req, res) => {
    console.log("Logging out");
    req.logout();
    return res.redirect("/");
})

// // REGISTER USER

router.post("/register", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking if the user exists
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        );

        if (user.rows.length > 0) {
            return res.status(401).send(`An account already exists for ${email}`);
        };

        // and if not, add the user to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        console.log(`User ${name} added to database`);
        return res.json(newUser.rows[0]);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
});

// AUTHORISATION CHECKS 

module.exports = router;