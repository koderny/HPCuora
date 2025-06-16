import { NavLink } from 'react-router-dom';
// import './QuestionCard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAQuestionThunk } from '../../store/question';


const QuestionCard = ({ id, userId, questionBody, questionImage, author, loggedIn }) => {
    const dispatch = useDispatch();
    const handleDelete = async (event) => {
        try {
            await dispatch(deleteAQuestionThunk(id))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="question-post">

            <div>
                <p className='question-card-text'>{author.firstName} {author.lastName}</p>
                <NavLink id='question-card-body'>

                    <div id='question-card-name-comment'>
                        <p className="question-card-body-text">{questionBody}</p>
                        {questionImage.map((image) => (
                            <img src={image.url} />
                        ))}

                    </div>
                </NavLink>
                {loggedIn == author?.id ? <button onClick={handleDelete}>Delete</button> : ""}
            </div>
        </div>
    )
}











export default QuestionCard;