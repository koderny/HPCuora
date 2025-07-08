import './CommentCard.css';
import { useModal } from '../../context/Modal'
// import UpdateCommentModal from '../AllQuestions/UpdateAComment';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import DeleteCommentModal from '../DeleteCommentModal';
import UpdateCommentModal from '../AllQuestions/UpdateAComment';


const CommentCard = ({ id, commentBody, commenter, questionId, userId, updatedAt }) => {

    const { setModalContent } = useModal();
    const currentUser = useSelector((state) => state.session.user)
    // console.log(currentUser)
    const commentDate = (commentDate) => {

        const date = new Date(commentDate);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    return (
        <div className='comment-card'>
            <div className="author-profile-pic">
                        {commenter?.profilePicUrl ? <img src={commenter?.profilePicUrl} alt={commenter?.firstName} /> : <img src="profilePics/NPP.jpeg" alt="avatar" />}
                        <p className='question-card-text'>{commenter?.firstName} {commenter?.lastName}</p>
                    </div>
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
                    modalComponent={<DeleteCommentModal questionId={questionId} commentId={id} />}
                />
               </div>
                )}
        </div>
    )
}

export default CommentCard;

