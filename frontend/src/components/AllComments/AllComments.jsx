import './AllComments.css';
import CommentCard from '../CommentCard';
import { useSelector } from 'react-redux';



const AllComments = () => {
  const comments = useSelector((state) => state.comments.AllComments);
  const currentUser = useSelector((state) => state.session.user);
  return (
    <div id="all-comments">
      {comments.length &&
        comments.map((comment, i) => {
          return (
            <div key={`${comment.id}-${i}`} className="all-comments-comment">
              <CommentCard comment={comment} questionId={comment.questionid} />
              
              <hr id="all-comments-line"></hr>
            </div>
          );
        })}
    </div>
  );
};

export default AllComments;