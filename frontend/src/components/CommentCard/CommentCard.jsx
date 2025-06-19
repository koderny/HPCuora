import './CommentCard.css';
import { useModal } from '../../context/Modal'
// import UpdateCommentModal from '../AllQuestions/UpdateAComment';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteCommentModal from '../DeleteCommentModal';
import UpdateCommentModal from '../AllQuestions/UpdateAComment';


const CommentCard = ({ id, commentBody, questionId, userId, updatedAt }) => {

    const { setModalContent } = useModal();
    const currentUser = useSelector((state) => state.session.user)
    console.log(currentUser)
    const commentDate = (commentDate) => {

        const date = new Date(commentDate);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    return (
        <div id='comment-card'>

            <span> {commentBody}</span>

            <div id="comment-card-comment-user-date-container">
                {/* <span className="comment-card-comment-user-date">
                    {comment.user.firstName} {comment.user.lastName}
                </span> */}
                <span className='comment-card-comment-user-date'>
                    {commentDate(updatedAt)}
                </span>
            </div>
            { currentUser && currentUser.id === userId && (
                <div id='comment-card-buttons'>
                <button
                    className='update-delete-button'
                    onClick={() =>
                        setModalContent(
                            <UpdateCommentModal
                                commentId={id}
                                questionId={questionId}
                            />
                        )
                    }
                >
                    Edit
                </button>
                {/* <UpdateCommentModal commentId={}/> */}
                <OpenModalButton
                        buttonText="Delete"
                        buttonClassName="delete-btn"
                    modalComponent={<DeleteCommentModal commentId={id} />}
                />
               </div>
                )}
        </div>
    )
}

export default CommentCard;

