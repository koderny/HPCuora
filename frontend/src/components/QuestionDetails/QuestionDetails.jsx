import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAQuestionThunk } from '../../store/question';
import './QuestionDetails.css';
import CommentCard from '../CommentCard/CommentCard';
import CommentFormModal from '../AllQuestions/CommentFormModal';

const QuestionDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getAQuestionThunk(id));
    },[dispatch, id])

    const question = useSelector(state => state.questions.byId[id])
    // console.log(question, "question details")

    if(!question){
        return <div>Loading...</div>
    }

  return (
    <div id='question-detail-box'>
        <h1>{question.questionBody}</h1>
        
        <div id="question-details">
        {question?.questionImage?.map((image, id) => (
            <>
                {image.url && <img src={image.url} key={id}/> }
            </>
        ))}
        </div>
        
        <CommentFormModal questionId={question.id}/>
        {question?.comments?.map((comment, id) => (
            <CommentCard {...comment} key={id}/>
        ))}
    </div>
  )
}

export default QuestionDetails;

// [
//     {
//         "id": 11,
//         "userId": 3,
//         "questionId": 6,
//         "commentBody": "The first movie was released in 1984",
//         "createdAt": "2025-07-08T00:48:33.000Z",
//         "updatedAt": "2025-07-08T00:48:33.000Z"
//     },
//     {
//         "id": 12,
//         "userId": 7,
//         "questionId": 6,
//         "commentBody": "First movie in 1984, second in 1991, third in 2003, fourth in 2009, fifth in 2015 and the last one in 2019",
//         "createdAt": "2025-07-08T00:48:33.000Z",
//         "updatedAt": "2025-07-08T00:48:33.000Z"
//     }
// ]