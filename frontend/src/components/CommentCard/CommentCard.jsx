import './CommentCard.css';
import { useModal } from '../../context/Modal'
import UpdateCommentModal from '../AllQuestions/UpdateAComment';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteCommentModal from '../DeleteCommentModal';


const CommentCard = ({ comment, questionId }) => {
    const { setModalContent } = useModal();
    const currentUser = useSelector((state) => state.session.user)
    const commentDate = (commentDate) => {
        const splCommentDate = [];
        splCommentDate = commentDate.split(' ');
        const constructedCommentDate =
        `${splCommentDate[2]} ${splCommentDate[1]}, ${splCommentDate[3]}`
        return constructedCommentDate;
    }

    return (
        <div id='comment-card'>
        
            <span style={{fontSize: '1.1rem'}}>{comment.comment}</span>
                
            <div id="comment-card-comment-user-date-container">
                <span className="comment-card-comment-user-date">
                    {comment.user.firstName} {comment.user.lastName}
                </span>
                <span className='comment-card-comment-user-date'>
                    {commentDate(comment.updated_at)}
                </span>
            </div>
            { currentUser && currentUser.id === comment.user.id && (
                <div id='comment-card-buttons'>
                <button
                    className='update-delete-button'
                    onClick={() =>
                        setModalContent(
                            <UpdateReviewModal
                                commentId={comment.id}
                                questionId={questionId}
                            />
                        )
                    }
                >
                    Edit
                </button>
                <OpenModalButton
                        buttonText="Delete"
                        buttonClassName="delete-btn"
                    modalComponent={<DeleteCommentModal commentId={comment.id} />}
                />
               </div>
                )}
        </div>
    )
}

export default CommentCard;