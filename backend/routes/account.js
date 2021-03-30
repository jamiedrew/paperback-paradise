const router = require("express").Router();
const pool = require("../db");
const passport = require("passport");

router.get("/", isAuthorised, async (req, res) => {
    try {
        // req.user has the payload!
        const user = await pool.query(
            "SELECT user_name, user_email FROM users WHERE user_id = $1",
            [req.user.user_id]
        );

        res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
        res.status(500).json(error);
    }
});

router.get("/orders", isAuthorised, async (req, res) => {
    try {
        
        const orderList = await pool.query(
            "SELECT * FROM orders WHERE user_id = $1 ORDER BY date_created DESC",
            [req.user.user_id]
        );

        if (orderList.rows.length === 0) {
            res.json(`No orders from ${req.user.user_name}`);
        } else {
            res.json(orderList.rows);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
});

// router.get("/orders/:orderID", async (req, res) => {
//     try {
//         const { orderID } = req.params;

//         const order = await pool.query(
//             "SELECT * FROM ORDERS WHERE order_id = $1 AND user_id = $2",
//             [orderID, req.user]
//         );

//         res.json(order);
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json("Server Error");
//     }
// });

router.post("/checkout", async (req, res) => {
    try {
        // see if there's anything in the cart
        // make an order out of it
        // continue along this path to the payment stuff
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

function isAuthorised (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json("Not authorised");
        res.redirect("/auth/login")
    }
};

module.exports = router;