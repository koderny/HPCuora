import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoriteThunk, getAllFavoritesThunk } from '../../store/savedQuestion';
import { Link, useNavigate } from 'react-router-dom';
import './FavoritesPage.css';


const FavoritesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const favorites = useSelector((state) => state.favorites.allFavorites);
    console.log(favorites, "favorites")

    useEffect(() => {
        dispatch(getAllFavoritesThunk());
    }, [dispatch]);

    const handleClickQuestion = (questionId) => {
        navigate(`/questions/${questionId}`);
    };

    if(!sessionUser){
        return <h2>Log in to add to your favorites!!</h2>;
    }else if (!favorites || favorites.length === 0) {
        return <div>No favorites yet!</div>;
    }

    const deleteFavorite = async (e, questionId) => {
        e.preventDefault();
        e.stopPropagation();
            await dispatch(deleteFavoriteThunk(questionId));
        };

    return (
        <div className="favorites-page-container">
            <h1>Your Favorites</h1>
            <ul className="favorites-list">
                {favorites.map((fav) => (
                    <li key={fav.id} className="favorite-item">
                        <div className="favorite-product-info" 
                        
                        >
                            <p>  {fav.favQuestion?.author?.firstName} {fav.favQuestion?.author?.lastName}</p>
                            <Link to={`/questions/${fav.favQuestion.id}`}>  {fav.favQuestion?.questionBody}</Link>
                            <button onClick={(e) => deleteFavorite(e, fav.favQuestion.id)}>
                                Delete Favorite
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesPage;
