const jwt = require("jsonwebtoken");

// this allows us to get all the environment variables:
require("dotenv").config();

const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.SECRET, { expiresIn : "1h" });
};

module.exports = jwtGenerator;