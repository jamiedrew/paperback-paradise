const router = require("express").Router();
const pool = require ("../db");


router.get("/", async (req, res) => {
    try {
        const allBooks = await pool.query("SELECT * FROM books");
        res.json(allBooks.rows);
    } catch (error) {
        console.log(error.message);
    }
})

router.get("/:bookID", async (req, res) => {
    try {

        const { bookID } = req.params;
        const book = await pool.query(
            "SELECT * FROM books WHERE book_id = $1",
            [bookID]
        );

        res.json(book.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
})


router.post("/", async (req, res) => {
    try {

        const { title, author, genre } = req.body;
        const newBook = await pool.query(
            "INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *",
            [title, author, genre]
        );

        res.json(newBook.rows[0]);

    } catch (error) {
        console.log(error.message);
    }
})

router.put("/:bookID", async (req, res) => {
    try {
        const { bookID } = req.params;
        const { title, author, genre, price } = req.body;

        const updateBook = await pool.query(
            "UPDATE books SET title = $1, author = $2, genre = $3, price = $4 WHERE book_id = $5",
            [title, author, genre, price, bookID]
            );

        res.json(`${bookID}: ${title} updated.`);

    } catch (error) {
        console.log(error.message);
    }
})


router.delete("/:bookID", async (req, res) => {
    try {
        const { bookID } = req.params;
        const deleteBook = await pool.query(
            "DELETE FROM books WHERE book_id = $1",
            [bookID]
        );

        res.json(`Book ${bookID} deleted.`)
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;