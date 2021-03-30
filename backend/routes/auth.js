const passport = require("passport");

const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const { route } = require("./account");

// const jwtGenerator = require("../utils/jwtGenerator");
// const validInfo = require("../middleware/validInfo");
// const authorisation = require("../middleware/authorisation");

router.get("/login", (req, res) => {
    res.json("This is a login page.")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/auth/register",
    failureFlash: false
}))

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
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

// // LOGIN
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // check if the user exists in database
//         const user = await pool.query(
//             "SELECT * FROM users WHERE user_email = $1",
//             [email]
//         );

//         if (user.rows.length === 0) {
//             return res.status(401).json(`No account exists for ${email}`);
//         }

//         // check password
//         const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

//         if (!validPassword) {
//             return res.status(401).json("Incorrect password");
//         };

//         return res.json(user.rows[0].user_name);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json("Server Error");
//     }
// });

// // // this route keeps us logged in when the react app refreshes
// // router.get("/is-verified", authorisation, async (req, res) => {
// //     try {
// //         res.json(true);
// //     } catch (error) {
// //         console.error(error.message);
// //         res.status(500).send("Server Error");
// //     }
// // })

module.exports = router;