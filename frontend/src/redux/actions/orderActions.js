import axios from "axios";

export const createOrder = (cartItems = []) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_ORDER_REQUEST" });

        const { order } = await axios.post("/account/orders", { items: cartItems });

        dispatch({
            type: "CREATE_ORDER_SUCCESS",
            payload: order
        });

    } catch (error) {
        dispatch({
            type: "CREATE_ORDER_FAIL",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getOrders = () => async (dispatch) => {
    try {

        dispatch({ type: "GET_USER_ORDERS_REQUEST" });

        const { data } = await axios.get("/account/orders");

        dispatch({
            type: "GET_USER_ORDERS_SUCCESS",
            payload: data,
        });
        
    } catch (error) {
        dispatch ({
            type: "GET_USER_ORDERS_FAIL", 
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}