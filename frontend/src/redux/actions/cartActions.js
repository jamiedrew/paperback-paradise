import axios from "axios";

export const addToCart = (id) => async (dispatch, getState) => {

    const { data } = await axios.get(`/books/${id}`);

    dispatch ({
        type: "ADD_TO_CART",
        payload: {
            id: data.id,
            title: data.title,
            author: data.author,
            cover_img: data.cover_img,
            price: data.price
        }
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: "REMOVE_FROM_CART",
        payload: id
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}