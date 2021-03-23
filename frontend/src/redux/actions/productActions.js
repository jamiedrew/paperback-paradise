import axios from "axios";

export const getBooks = () => async (dispatch) => {
    try {

        dispatch({ type: "GET_PRODUCTS_REQUEST" });

        const { data } = await axios.get("/books");

        dispatch({
            type: "GET_PRODUCTS_SUCCESS",
            payload: data,
        });

    } catch (error) {

        dispatch({
            type: "GET_PRODUCTS_FAIL",
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    };
};

export const getGenres = () => async (dispatch) => {
    try {

        dispatch({ type: "GET_GENRES_REQUEST" });

        const { data } = await axios.get("/genres");

        dispatch({
            type: "GET_GENRES_SUCCESS",
            payload: data,
        });

    } catch (error) {

        dispatch({
            type: "GET_GENRES_FAIL",
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    };
};

export const getBooksByGenre = (genre) => async (dispatch) => {
    try {

        dispatch({ type: "GET_GENRE_BOOKS_REQUEST" });

        const { data } = await axios.get(`/genres/${genre}`);

        dispatch({
            type: "GET_GENRE_BOOKS_SUCCESS",
            payload: data,
        });

    } catch (error) {

        dispatch({
            type: "GET_GENRE_BOOKS_FAIL",
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    };
};