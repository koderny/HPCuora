import { useDispatch, useSelector } from 'react-redux';
import './AllQuestions.css';
import QuestionCard from './QuestionCard';
import { useEffect, useState } from 'react';
import { getAllQuestionsThunk } from '../../store/question';
import { getAllFavoritesThunk } from '../../store/savedQuestion';
import { getAllCategoriesThunk } from '../../store/category';
import { useOutletContext } from 'react-router-dom';


const AllQuestions = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser)
    const questions = useSelector((state) => state.questions.allQuestions);
    const categories = useSelector((state) => state.categories.allCategories);
    // console.log(categories, 'categories')

    const [categoryId, setCategoryId] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [commentsVisible, setCommentsVisible] = useState(false);
    const { search } = useOutletContext();


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

    let filteredQuestions = questions;

    if (categoryId) {

        filteredQuestions = filteredQuestions.filter(question => question.categoryId == categoryId);
    }

    if(search){
        filteredQuestions = filteredQuestions.filter(question => question.questionBody.toLowerCase().includes(search.toLowerCase()));
    }



    // console.log(filteredQuestions, "filtered questions")

    if (isLoaded) {
        return (
            <div id='all-questions'>
                <div className='outside-bar'>
                    <ul className="category-name">
                        <li>
                            <button onClick={() => setCategoryId(null)}>
                                All
                            </button>
                        </li>
                        {categories && categories.length > 0 ? categories.map((category, i) => {
                            return (
                                <li key={i}>
                                    <img src={`assets/${category.category}.jpeg`} />
                                    <button onClick={() => setCategoryId(category.id)}>
                                        {category.category}
                                    </button>
                                </li>
                            )
                        }) : ""
                        }
                    </ul>

                </div>

                <div className='questions'>


                    {filteredQuestions && filteredQuestions.length ? filteredQuestions.slice().reverse().map((question, i) => {
                        return (
                            <div id='single-card' key={`${i}-${question.id}`}>
                                <QuestionCard {...question} loggedIn={sessionUser?.id} 
                                // commentsVisible={commentsVisible} setCommentsVisible={setCommentsVisible} 
                                />
                            </div>
                        )
                    }) : ''}

                </div>
            </div>
        )
    }
    else return <h1>Loading...</h1>;
}







export default AllQuestions;