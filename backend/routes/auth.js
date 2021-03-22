const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");

// register user
router.post("/register", validInfo, async (req, res) => {
    try {
        
        // destructure the req.body
        const { name, email, password } = req.body;

        // check if the user exists (and if they do, throw an error)
        const user = await pool.query(
            "SELECT  * FROM users WHERE user_email = $1",
            [email]
        );

        if (user.rows.length > 0) {
            return res.status(401).send(`An account already exists for ${email}.`)
        };

        // bcrypt the user password, obviously
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // put the user in the database
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        );

        // generate the jwt
        const token = jwtGenerator(newUser.rows[0].user_id);
        return res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// login
router.post("/login", validInfo, async (req, res) => {
    try {

        // destructure the req.body
        const { email, password } = req.body;

        // check if user exists -- if not, throw an error
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(401).json(`Account doesn't exist for ${email}.`);
        };

        // check if incoming password is the same as the database password
        // this compare() function returns a boolean!
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        
        if (!validPassword) {
            return res.status(401).json("Password incorrect.");
        }

        // if we're passing the test, give them a JWT
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// this route keeps us logged in when the react app refreshes
router.get("/is-verified", authorisation, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;