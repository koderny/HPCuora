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
    console.log(question)

    if(!question){
        return <div>Loading...</div>
    }

  return (
    <div id='question-detail-box'>
        <h1>{question.questionBody}</h1>
        
        <div id="question-details">
        {question?.questionImage?.map((image, id) => (
            <img src={image.url} key={id}/>
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