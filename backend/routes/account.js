const router = require("express").Router();
const pool = require("../db");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, async (req, res) => {
    try {
        
        // req.user has the payload!
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1",
            [req.user]
        );

        res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
});

router.get("/orders", authorisation, async (req, res) => {
    try {
        
        const orderList = await pool.query(
            "SELECT * FROM orders WHERE user_id = $1 ORDER BY date_created DESC",
            [req.user]
        );

        res.json(orderList);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
});

router.get("/orders/:orderID", authorisation, async (req, res) => {
    try {
        const { orderID } = req.params;

        const order = await pool.query(
            "SELECT * FROM ORDERS WHERE order_id = $1 AND user_id = $2",
            [orderID, req.user]
        );

        res.json(order);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
});

router.post("/checkout", authorisation, async (req, res) => {
    try {
        // see if there's anything in the cart
        // make an order out of it
        // continue along this path to the payment stuff
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;