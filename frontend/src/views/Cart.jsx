import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";

import "./Cart.css";

const Cart = ({show, click}) => {
    // const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const cartClasses = ["cart"];

    if (show) {
        cartClasses.push("show");
    }

    const getSubtotal = () => {
        return cartItems.reduce((price, item) => item.price + price, 0);
    }

    return (
        <div className={cartClasses.join(" ")}>
            <div className="items">
                {cartItems.length === 0 ? (<p>Your cart is empty!</p>) : (
                    cartItems.map(item => 
                        <CartItem 
                            key={item.id}
                            id={item.id}
                            author={item.author}
                            title={item.title}
                            cover={item.cover_img}
                            price={item.price}
                        />)
                )}
            </div>
            {cartItems.length > 0 && <div className="cart_info">
                <p>Subtotal: <span className="subtotal">£{getSubtotal().toFixed(2)}</span></p>
                <Link to="/checkout"><button onClick={click}>Checkout</button></Link>
            </div>}
        </div>
    )
}

export default Cart;