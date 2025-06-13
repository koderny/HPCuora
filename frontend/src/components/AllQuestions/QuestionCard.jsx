import { NavLink } from 'react-router-dom';
// import './QuestionCard.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const QuestionCard = ({ id, userId, title, questionBody, questionImages, author }) => {
    const dispatch = useDispatch();

    return (
        <div className="question-post">

            <div>
                <p className='question-card-text'>{author.firstName} {author.lastName}</p>
                <div id='question-card-body'>
                    <p className="question-card-body-text">{questionBody}</p>

                    <div id='question-card-name-comment'>
                        <p className='question-card-text'>{title}</p>
                        {/* <p className='question-card-text'>{commentBody}</p> */}
                    </div>
                </div>
            </div>
        </div>
            )
}











            export default QuestionCard;