export const createOrderReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case "CREATE_ORDER_REQUEST":
            return {
                loading: true,
            }
        case "CREATE_ORDER_SUCCESS":
            return {
                loading: false,
                order: action.payload
            }
        case "CREATE_ORDER_FAIL":
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case "GET_USER_ORDERS_REQUEST":
            return {
                loading: true,
            };
        case "GET_USER_ORDERS_SUCCESS":
            return {
                loading: false,
                orders: action.payload
            };
        case "GET_USER_ORDERS_FAIL":
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}