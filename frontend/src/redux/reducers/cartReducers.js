// const CART_INITIAL_STATE = {
//     cartItems: []
// };

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const itemInCart = state.cartItems.find((cartItem) => cartItem.id === action.payload.id);

            if (itemInCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) => 
                        cartItem.id === itemInCart.id ? action.payload : cartItem )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload)
            }
        case "EMPTY_CART":
            return {cartItems: []}
        default:
            return state;
    }
}