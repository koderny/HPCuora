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
import { FaHeart, FaRegComment } from "react-icons/fa";
import { addFavoritesThunk, deleteFavoriteThunk } from '../../store/savedQuestion';



const QuestionCard = ({ id, questionBody, questionImage, author, loggedIn, comments }) => {


    const dispatch = useDispatch();
    const favoriteById = useSelector(state => state.favorites.byId[id]);

    const [questionId, setQuestionId] = useState(null);
    const [commentsVisible, setCommentsVisible] = useState(false);
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

                    <div className="author-profile-pic">
                        {author?.profilePicUrl ? <img src={author?.profilePicUrl} alt={author?.firstName} /> : <img src="/profilePics/NPP.jpeg" alt="avatar" />}
                        <p className='question-card-text'>{author?.firstName} {author?.lastName}</p>
                    </div>

                    <button
                        className='heart'
                        onClick={addToFavoritesHeart}
                    >
                        {favoriteById ? <FaHeart className='favorited' /> : <CiHeart className='unfavorited' />}
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
                    <div className='buttons-wrapper'>
                        <NavLink className="button-secondry" to={`/questions/${id}/edit`}>Edit</NavLink>
                        <button className="button-danger" onClick={handleDelete}>Delete</button>
                    </div>
                ) : ""}
                {questionId !== null && (
                    <DeleteQuestionModal questionId={questionId} setQuestionId={setQuestionId} />
                )}
                <div className='more-info-buttons'>
                    <p onClick={() => setCommentsVisible(!commentsVisible)}><FaRegComment />{comments.length} </p>
                </div>
                {/* <CommentFormModal/> */}
                {commentsVisible && comments.map((comment, id) => (
                    <CommentCard {...comment} key={id} />
                ))}
            </div>
        </div>
    )
}


export default QuestionCard;