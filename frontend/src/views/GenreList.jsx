import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getGenres as listGenres } from "../redux/actions/productActions";

import "./GenreList.css"

const GenreList = () => {

    const dispatch = useDispatch();

    const getGenres = useSelector(state => state.getGenres);
    const { genres, loading, error } = getGenres;

    useEffect(() => {
        dispatch(listGenres())
    }, [dispatch]);

    return (
        <> 
            <h3>Browse by genre</h3>

            <div className="genre_list">
        
                { loading ? <h3>loading...</h3> : error ? <h3>{error}</h3> : genres.map(item =>
                    <Link to={`/genres/${item.genre}`}>
                        <div className="genre_item">
                            {item.genre}
                        </div>
                    </Link>
                ) }

            </div>
        </>
        
    )
}

export default GenreList;