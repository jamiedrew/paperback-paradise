import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBooks as listBooks } from "../redux/actions/productActions";

import Item from "../components/Item";

import "./Books.css";

const Books = () => {

    const dispatch = useDispatch();

    const getBooks = useSelector(state => state.getBooks);
    const { products, loading, error } = getBooks;

    useEffect(() => {
        dispatch(listBooks())
    }, [dispatch])

    return (
        <div className="books">

            <h3>Books For Sale</h3>

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

export default Books;