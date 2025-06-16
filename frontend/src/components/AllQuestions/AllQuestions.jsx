import { useDispatch, useSelector } from 'react-redux';
import './AllQuestions.css';
import QuestionCard from './QuestionCard';
import { useEffect, useState } from 'react';
import { getAllQuestionsThunk } from '../../store/question';



const AllQuestions = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    const questions = useSelector((state) => state.questions.allQuestions);
    console.log(questions, "questions")

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const getAllQuestions = async () => {
            await dispatch(getAllQuestionsThunk());
            setIsLoaded(true);
        }
        if (!isLoaded) {
            getAllQuestions()
        }
    }, [dispatch, isLoaded, questions])

    if (isLoaded) {
        return (
            <div id='all-questions'>
            {questions && questions.length ? questions.map((question, i) => {
                return (
                    <div key={`${i}-${question.id}`}>
                        <QuestionCard {...question} loggedIn={sessionUser?.id} />
                    </div>
            )
        }) : ''}
        </div>
    )
}
else return <h1>Loading...</h1>;
}







export default AllQuestions;