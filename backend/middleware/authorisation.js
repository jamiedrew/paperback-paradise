const jwt = require("jsonwebtoken");
// access environment variables:
require("dotenv").config();

module.exports = async(req, res, next) => {
    try {
        
        const token = req.header("token");

        if (!token) {
            return res.status(403).json("Not authorised");
        };

        const payload = jwt.verify(token, process.env.SECRET);

        // and put THAT (verified) user object into the request body:
        req.user = payload.user;
        next();

    } catch (error) {
        console.error(error.message);
        res.status(403).json("Not authorised")
    }
}