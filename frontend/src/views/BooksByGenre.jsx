import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Item from "../components/Item";
import { getBooksByGenre as listBooksByGenre } from "../redux/actions/productActions";

import "./Books.css"

const BooksByGenre = () => {

    const { genre } = useParams();

    const dispatch = useDispatch();

    const getBooksByGenre = useSelector(state => state.getBooksByGenre);
    const { products, loading, error } = getBooksByGenre;

    useEffect(() => {
        dispatch(listBooksByGenre(genre))
    }, [dispatch, genre])

    return (
        <div className="books">
            <h3>{genre} books</h3>

            <div className="books_list">
            { loading ? <h3>Loading...</h3> : error ? <h3>{error}</h3> : products.map(product =>
                    <Item 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        author={product.author}
                        cover={product.cover_img}
                        price={product.price}
                    />
                )}
            </div>
        </div>
        
    )
}

export default BooksByGenre;