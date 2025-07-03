import { NavLink } from 'react-router-dom';
// import './QuestionCard.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteQuestionModal from '../DeleteQuestionModal';
import CommentCard from '../CommentCard/CommentCard';
import './QuestionCard.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { addFavoritesThunk, deleteFavoriteThunk } from '../../store/savedQuestion';



const QuestionCard = ({ id, questionBody, questionImage, author, loggedIn, comments }) => {

    const [questionId, setQuestionId] = useState(null);
    const dispatch = useDispatch();
    const favoriteById = useSelector(state => state.favorites.byId[id]);
    // console.log(id, favoriteById, "favoritebyid")
    const handleDelete = async () => {
        setQuestionId(id)
        // try {
        //     await dispatch(deleteAQuestionThunk(id))
        // } catch (error) {
        //     console.error(error)
        // }
    }
    const addToFavoritesHeart = async () => {
        if (favoriteById) {
            await dispatch(deleteFavoriteThunk(id));
        } else {
            await dispatch(addFavoritesThunk(id))
        }
    }


    return (
        <div className="question-post">
            <div>
                <div className="question-user-fav" >
                    <p className='question-card-text'>{author?.firstName} {author?.lastName}</p>
                    <button
                        className='heart'
                        onClick={addToFavoritesHeart}
                    >
                        {favoriteById ? <FaHeart className='favorited' /> :  <CiHeart className='unfavorited' /> }
                    </button>
                </div>
                <NavLink to={`/questions/${id}`} id='question-card-body'>

                    <div id='question-card-name-comment'>
                        <p className="question-card-body-text">{questionBody}</p>

                        {questionImage.length > 0 && questionImage?.map((image, id) => (
                            // If image exist execute -->
                            <div className="question-card-image">
                                {image.url && <img src={image?.url} key={id} />}
                            </div>

                        ))}

                    </div>
                </NavLink>
                {loggedIn == author?.id ? (
                    <div>
                        <NavLink to={`/questions/${id}/edit`}>Edit</NavLink>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                ) : ""}
                {questionId !== null && (
                    <DeleteQuestionModal questionId={questionId} setQuestionId={setQuestionId} />
                )}
                {/* <CommentFormModal/> */}
                {comments.map((comment, id) => (
                    <CommentCard {...comment} key={id} />
                ))}
            </div>
        </div>
    )
}


export default QuestionCard;