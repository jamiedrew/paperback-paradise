import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getBooksReducer, getGenresReducer, getBooksByGenreReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
    getBooks: getBooksReducer,
    getGenres: getGenresReducer,
    getBooksByGenre: getBooksByGenreReducer,
    cart: cartReducer
});

const middleware = [thunk];

const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [] ;

const initialState = {
  cart: {
    cartItems: cartFromLocalStorage
  }
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
