import { addToCart } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";

import "./Item.css";

const Item = ({ id, title, author, price, cover }) => {

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart(id));
    }

    return (
        <div className="item">
            <div className="cover">
                <img src={`/covers/${cover}.jpg`} alt={cover} />
            </div>
            <div className="info">
                <h4>{title}</h4>
                <h5>{author}</h5>
                <p><span className="price">£{price}.00</span></p>
                <button type="button" onClick={addToCartHandler}>Add To Cart</button>
            </div>
        </div>
    );
}

export default Item;