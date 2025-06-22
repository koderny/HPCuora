import { NavLink } from 'react-router-dom';
// import './QuestionCard.css';
import {  useState } from 'react';
// import { useDispatch } from 'react-redux';
import DeleteQuestionModal from '../DeleteQuestionModal';
import CommentCard from '../CommentCard/CommentCard';



const QuestionCard = ({ id, questionBody, questionImage, author, loggedIn, comments }) => {

    const [questionId, setQuestionId] = useState(null);
    // const dispatch = useDispatch();
    const handleDelete = async () => {
    setQuestionId(id)
        // try {
        //     await dispatch(deleteAQuestionThunk(id))
        // } catch (error) {
        //     console.error(error)
        // }
    }

    return (
        <div className="question-post">

            <div>
                <p className='question-card-text'>{author?.firstName} {author?.lastName}</p>
                <NavLink to={`/questions/${id}`} id='question-card-body'>

                    <div id='question-card-name-comment'>
                        <p className="question-card-body-text">{questionBody}</p>
                       <p className="question-card-image">{questionImage?.map((image, id) => (
                            <img src={image?.url} key={id}/>
                        ))} </p>

                    </div>
                </NavLink>
                {loggedIn == author?.id ? (
                    <div>
                    <NavLink to={`/questions/${id}/edit`}>Edit</NavLink>
                    <button onClick={handleDelete}>Delete</button> 
                    </div>
                )  : ""}
                {questionId !== null && (
                    <DeleteQuestionModal questionId = {questionId} setQuestionId={setQuestionId}/>
                )}
                {/* <CommentFormModal/> */}
                {comments.map((comment, id) => (
                    <CommentCard {...comment} key={id}/>
                ))}
            </div>
        </div>
    )
}


export default QuestionCard;