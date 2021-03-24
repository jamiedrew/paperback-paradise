import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getGenres as listGenres } from "../redux/actions/productActions";

import "./GenreList.css"

const GenreList = () => {

    let index = 0;
    let weakmap = new WeakMap();

    const dispatch = useDispatch();

    const getGenres = useSelector(state => state.getGenres);
    const { genres, loading, error } = getGenres;

    useEffect(() => {
        dispatch(listGenres())
    }, [dispatch]);

    const weakKey = (object) => {
        let key = weakmap.get(object);
        if (!key) { key = `genre-${index++}` };
        return key;
    }

    return (
        <div className="container">
        <h3>Browse by Genre</h3>
            <div className="genre_list">    
                { loading ? <h3>loading...</h3> : error ? <h3>{error}</h3> : genres.map(item =>
                    <Link to={`/genres/${item.genre}`}
                            key={weakKey(item)}>
                        <div className="genre_item">
                            {item.genre}
                        </div>
                    </Link>
                ) }
            </div>
        </div>
        
        
    )
}

export default GenreList;