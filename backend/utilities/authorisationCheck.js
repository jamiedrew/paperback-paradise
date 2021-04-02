function isAuthorised (req, res, next) {

    if (!req.user) {
        res.status(401).json("Not authorised");
        res.redirect("/")
    }

    next();

};

module.exports = isAuthorised;