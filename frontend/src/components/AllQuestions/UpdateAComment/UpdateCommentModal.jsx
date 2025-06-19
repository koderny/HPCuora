import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../context/Modal'
import './UpdateCommentModal.css'
import { getAllCommentsThunk, updateACommentThunk } from '../../../store/comment'
import { getAQuestionThunk } from '../../../store/question'


const UpdateCommentModal = ({ commentId, questionId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currentComment = useSelector((state) => state.comments.byId[commentId])
    console.log(currentComment)
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState("");


    useEffect(() => {
        if (currentComment) {
            setComment(currentComment.commentBody);
        }
    }, [currentComment])


    useEffect(() => {
      const newErrors= {};

      if (!comment.trim()) {
        newErrors.comment = "Comment is required";
      } else if (comment.length < 10) {
        newErrors.comment = "Comment must be at least 10 characters";
      } else if (comment.length > 500) {
        newErrors.comment = "Comment must be less than 500 characters";
      }


      setErrors(newErrors);
    }, [comment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setServerError("");

        const commentData = {
            comment
        };

        try {
            const res = await dispatch(updateACommentThunk(commentId, commentData));
            if (res.id) {
                await dispatch(getAllCommentsThunk(questionId))
                await dispatch(getAQuestionThunk(questionId))
                closeModal();
            } else if (res.errors) {
                setErrors(res.errors)
            } else {
                setServerError(res.message)
            }
        } catch (error) {
                setServerError("An error occurred")

        }
    }
    const validComment =
        comment.length >= 10 &&
        comment.length <= 500;

        return (
          <div id="review-form">
            <h1 id="review-form-title">Edit Your Comment</h1>
            <hr id="review-form-line"></hr>
            {serverError && <p className="error-message">{serverError}</p>}
            {errors.comment && <p className="error-message">{errors.comment}</p>}

            <form onSubmit={handleSubmit} id="review-form-form">
              <textarea
                placeholder="Leave your comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                id="review-form-review"
              />

              <button
                type="submit"
                disabled={!validComment}
                id="comment-form-submit"
              >
                Submit Your Comment
              </button>
            </form>
          </div>
        );

}




export default UpdateCommentModal
