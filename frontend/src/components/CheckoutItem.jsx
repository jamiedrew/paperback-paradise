import { useDispatch } from "react-redux";

import "./CartItem.css";

import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from "../redux/actions/cartActions";

const CheckoutItem = ({ id, title, cover, author, price }) => {

    const dispatch = useDispatch();
    const removeFromCartHandler = () => {
            dispatch(removeFromCart(id));
            console.log(`removing book ${id} from cart`);};

    return (
        <div className="checkout_item">
            <button type="button" onClick={removeFromCartHandler}><FaTrashAlt /></button>
            
            {/* <div className="image">
                <img src={`/covers/${cover}.jpg`} alt="" />
            </div> */}

            <div className="info">
                <p className="title">{title}</p>
                <p className="author">{author}</p>
                <p className="price">£{price}.00</p>
            </div>
            
            
        </div>
    )
}

export default CheckoutItem;