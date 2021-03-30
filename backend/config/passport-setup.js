const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("../db");

const initialise = () => {

    const authenticateUser = async (email, password, done) => {

        try {
    
            // check if the user exists in database
            const user = await db.query(
                "SELECT * FROM users WHERE user_email = $1",
                [email]
            );
    
            if (user.rows.length === 0) {
                return done(null, false, { message: `No user found for ${email}`});
            }
    
            // check password
            const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
    
            if (!validPassword) {
                return done(null, false, { message: "Incorrect password"});
            };

            console.log(user.rows[0]);
    
            return done(null, user);
    
        } catch (error) {
            console.log(error);
            res.status(500).json("Server Error");
        }
    }

    // LOCAL STRATEGY
    passport.use("local", new LocalStrategy (
        { usernameField: "email"},
        authenticateUser
    ));

    passport.serializeUser((user, done) => {
        console.log(user.rows[0]);
        done(null, user.rows[0].user_id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await db.query(
            "SELECT * FROM users WHERE user_id = $1",
            [id]
        )

        console.log(`Logged in as ${user.rows[0].user_name}`);
        done(null, user.rows[0]);
    })

}

module.exports = initialise;