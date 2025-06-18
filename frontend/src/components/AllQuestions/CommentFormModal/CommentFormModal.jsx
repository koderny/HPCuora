import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { createACommentThunk, getAllCommentsThunk } from "../../store/comment"
import "./CommentFormModal.css"
import { getAQuestionThunk } from "../../store/question"



const CommentFormModal = ({ questionId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [commentBody, setCommentBody] = useState("");
    const [errors, setErrors] = useState("");
    const [serverError, setServerError] = useState("");
    
  
  useEffect(() => {
    const newErrors = {};

    if (!commentBody.trim()) {
      newErrors.commentBody = "A Comment is required";
    } else if (commentBody.length < 10) {
      newErrors.commentBody = "Comment must be at least 10 characters";
    } else if (commentBody.length > 500) {
      newErrors.commentBody = "Comment must be less than 500 characters";
    }

    setErrors(newErrors);
  }, [commentBody]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setServerError("")

        const commentData = {
            questionid: questionId,
            commentBody,
        };

        try {
            const res = await dispatch(createACommentThunk(commentData));
            if (!res.errors) {
              await dispatch(getAllCommentsThunk(questionId));
              await dispatch(getAQuestionThunk(questionId));
                closeModal();
            } else {
                setErrors(res.errors);
            }
        } catch (error) {
            if (error instanceof Response) {
                const data = await error.json();
                if (data && data.message) {
                    setServerError(data.message);
                } else if (data && data.errors) {
                    setErrors(data.errors)
                }
            }
        }
    };
    const validComment =
      commentBody.length >= 10 &&
      commentBody.length <= 500;

    return (
      <div className="comment-form">
        <h1 id="comment-form-title">Leave A Comment</h1>
        <hr id="comment-form-line"></hr>

        {serverError && <p className="error-message">{serverError}</p>}
        {errors.comment && <p className="error-message">{errors.commentBody}</p>}
        

        <form onSubmit={handleSubmit} id="comment-form-form">
          <textarea
            id="comment-form-comment"
            placeholder="Leave your comment here"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            rows={6}
          />
          
          <button type="submit" disabled={!validComment} id="comment-form-submit">
            Submit Your Comment
          </button>
        </form>
      </div>
    );
}



export default CommentFormModal;