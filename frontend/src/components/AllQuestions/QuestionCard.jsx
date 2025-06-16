import { NavLink } from 'react-router-dom';
// import './QuestionCard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAQuestionThunk } from '../../store/question';
import DeleteQuestionModal from '../DeleteQuestionModal';


const QuestionCard = ({ id, userId, questionBody, questionImage, author, loggedIn }) => {

    const [questionId, setQuestionId] = useState(null);
    const dispatch = useDispatch();
    const handleDelete = async (event) => {
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
                <p className='question-card-text'>{author.firstName} {author.lastName}</p>
                <NavLink to={`/questions/${id}/edit`} id='question-card-body'>

                    <div id='question-card-name-comment'>
                        <p className="question-card-body-text">{questionBody}</p>
                       <p className="question-card-image">{questionImage.map((image) => (
                            <img src={image.url} />
                        ))} </p>

                    </div>
                </NavLink>
                {loggedIn == author?.id ? <button onClick={handleDelete}>Delete</button> : ""}
                {questionId !== null && (
                    <DeleteQuestionModal questionId = {questionId} setQuestionId={setQuestionId}/>
                )}
            </div>
        </div>
    )
}











export default QuestionCard;