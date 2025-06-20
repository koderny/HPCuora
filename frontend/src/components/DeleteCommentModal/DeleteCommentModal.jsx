import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import React from 'react';
import { deleteACommentThunk } from "../../store/comment";
import { getAQuestionThunk } from "../../store/question";
// import './DeleteReviewModal.css'


const DeleteCommentModal = ({ questionId, commentId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteACommentThunk(commentId));

        await dispatch(getAQuestionThunk(questionId))
        closeModal();
    };

    return (
        <div className="comment-form-container">
            <h1 id="heading">Confirm Delete</h1>
            <div>Are you sure you want to delete this comment?</div>
            <button onClick={handleClickDelete} className="delete-comment-button">
                Yes (Delete Comment)
            </button>
            <button onClick={closeModal} className="keep-comment-button">
                No (Keep Comment)
            </button>
        </div>
    );
};

export default DeleteCommentModal;