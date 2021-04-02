const router = require("express").Router();
const pool = require("../db");
const passport = require("passport");

const isAuthorised = require("../utilities/authorisationCheck");

router.get("/", isAuthorised, async (req, res) => {
    try {

        // req.user has the payload thanks to passport.deserializeUser() !
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
            "SELECT orders.order_id, orders.date_created, orders.status, books.title, books.author FROM orders JOIN books ON orders.item_id = books.id WHERE orders.user_id = $1 ORDER BY orders.date_created DESC",
            [req.user.user_id]
        );

        res.json(orderList.rows);
        console.log(orderList.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
});

router.post("/orders", isAuthorised, async (req, res) => {
    try {

        let { items } = req.body;
        console.log(items);
        
        items.forEach(async item => {
            await pool.query(
                "INSERT INTO orders (user_id, item_id, status) VALUES ($1, $2, $3)",
                [req.user.user_id, item.id, "pending"]
            )
        })

        console.log("Order submitted");
        res.status(201).json("Order submitted")

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

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

// function isAuthorised (req, res, next) {
//     if (req.user) {
//         next();
//     } else {
//         res.status(401).json("Not authorised");
//         res.redirect("/auth/login")
//     }
// };

module.exports = router;