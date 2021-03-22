const router = require("express").Router();
const pool = require ("../db");

router.get("/", async (req, res) => {
    try {
        const genreList = await pool.query("SELECT DISTINCT genre FROM books")
        res.json(genreList.rows);
    } catch (error) {
        console.log(error.message);
    }
});

router.get("/:genre", async (req, res) => {
    try {

        const { genre } = req.params;

        const genreList = await pool.query(
            "SELECT * FROM books WHERE genre = $1",
            [genre]
        );

        res.json(genreList.rows);

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;