import { useDispatch, useSelector } from 'react-redux';
import './AllQuestions.css';
import QuestionCard from './QuestionCard';
import { useEffect, useState } from 'react';
import { getAllQuestionsThunk } from '../../store/question';
import { getAllFavoritesThunk } from '../../store/savedQuestion';
import { getAllCategoriesThunk } from '../../store/category';



const AllQuestions = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    const questions = useSelector((state) => state.questions.allQuestions);
    const categories = useSelector((state) => state.categories.allCategories);
    console.log(categories, 'categories')

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const getAllQuestions = async () => {
            await dispatch(getAllQuestionsThunk());
            await dispatch(getAllFavoritesThunk());
            await dispatch(getAllCategoriesThunk());
            setIsLoaded(true);
        }
        if (!isLoaded) {
            getAllQuestions()
        }
    }, [dispatch, isLoaded, questions])

    if (isLoaded) {
        return (
            <div id='all-questions'>
                <div className='outside-bar'>
                    <ul className="category-name">
                    {categories && categories.length > 0 ? categories.map((category, i) => {
                        return (
                                <li key={i}>
                                    {category.category}
                                </li>
                        )
                    }) : ""
                    }
                            </ul>

                </div>

                {questions && questions.length ? questions.slice().reverse().map((question, i) => {
                    return (
                        <div id='single-card' key={`${i}-${question.id}`}>
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