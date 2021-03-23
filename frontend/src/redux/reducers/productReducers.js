export const getBooksReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return {
        loading: true,
        products: [],
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        products: action.payload,
        loading: false,
      };
    case "GET_PRODUCTS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }  
}

export const getGenresReducer = (state = {genres: []}, action) => {
  switch (action.type) {
    case "GET_GENRES_REQUEST":
      return {
        loading: true,
        genres: [],
      };
    case "GET_GENRES_SUCCESS":
      return {
        genres: action.payload,
        loading: false,
      };
    case "GET_GENRES_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }  
}

export const getBooksByGenreReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case "GET_GENRE_BOOKS_REQUEST":
      return {
        loading: true,
        products: [],
      };
    case "GET_GENRE_BOOKS_SUCCESS":
      return {
        products: action.payload,
        loading: false,
      };
    case "GET_GENRE_BOOKS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }  
}