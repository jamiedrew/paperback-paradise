import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getBooksReducer, getGenresReducer, getBooksByGenreReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    getBooks: getBooksReducer,
    getGenres: getGenresReducer,
    getBooksByGenre: getBooksByGenreReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
