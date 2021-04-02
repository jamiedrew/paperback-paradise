import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { createOrder as sendOrder } from "../redux/actions/orderActions";
import { emptyCart } from "../redux/actions/cartActions";

import CheckoutItem from "../components/CheckoutItem";

const Checkout = () => {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const { user_email } = JSON.parse(localStorage.getItem("user"))

    const getSubtotal = () => {
        return cartItems.reduce((price, item) => item.price + price, 0);
    }

    const dispatch = useDispatch();
    const createOrder = () => {
        dispatch(sendOrder(cartItems));
        dispatch(emptyCart());
        return <Redirect to="/account" />
    }

    if (!user_email || cartItems.length === 0) {
        return <Redirect to="/account" />
    }

    return (
        <div id="checkout">

            <h3>Checkout</h3>

            { cartItems.map(item => <CheckoutItem 
                                        key={item.id}
                                        id={item.id}
                                        author={item.author}
                                        title={item.title}
                                        cover={item.cover_img}
                                        price={item.price}
                                    /> ) }

            <div className="subtotal">Subtotal: £{getSubtotal().toFixed(2)}</div>

            <div className="confirm">
                <button onClick={createOrder}>Confirm Purchase</button>
                <Link to="/"><button>Continue Shopping</button></Link>
            </div>

        </div>
    )
}

export default Checkout;