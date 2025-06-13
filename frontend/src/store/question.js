// Imports
import { csrfFetch } from "./csrf";



// ACTION TYPES
const GET_ALL_QUESTIONS = 'question/getAllQuestions';
const GET_A_QUESTION = 'question/getAQuestion';
const CREATE_A_QUESTION = 'spots/createAQuestion'

// ACTION CREATIONS
const getAllQuestionsAction = (data) => ({
    type: GET_ALL_QUESTIONS,
    payload: data
});

const getAQuestion = (data) => ({

    type: GET_A_QUESTION,
    payload: data
});

const createAQuestion = (data) => ({
    type: CREATE_A_QUESTION,
    payload: data
})



// THUNK

//GET ALL question
export const getAllQuestionsThunk = () => async (dispatch) => {

    try {
        const res = await csrfFetch('/api/questions/');

        if (res.ok) {
            const data = await res.json();
            dispatch(getAllQuestionsAction(data))
        } else {
            throw res;
        }
    } catch (error) {
        console.log(error);
    }
};

//GET A QUESTION
export const getAQuestionThunk = (questionId) => async (dispatch) => {
    console.log(questionId)
    try {
        const res = await csrfFetch(`/api/questions/${questionId}`);

        if (res.ok) {
            const data = await res.json();
            // console.log(data, "--------> HERE")
            dispatch(getAQuestion(data));
        }
    } catch (error) {
        console.log(error)
    }
}

//CREATE A QUESTION
export const createAQuestionThunk = (question) => async (dispatch) => {

    try {
        const res = await csrfFetch('/api/questions/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(question),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createAQuestion(data));
            return data;
        }
        
        throw res;
    } catch (error) {
        return error; 
    }
};

// REDUCERS

const initialState = {
    allQuestions: [],
    byId: {}
};

function questionReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_ALL_QUESTIONS:
            const questionArr = action.payload.Questions;

            newState = { ...state };
            newState.allQuestions = questionArr;

            let newByIdQuestion = {};
            for (let question of questionArr) {
                newByIdQuestion[question.id] = question;
            }

            newState.byId = newByIdQuestion;

            return newState;



        case GET_A_QUESTION:

            const singleQuestion = action.payload;
            newState = { ...state };
            newState.allQuestions = [...state.allQuestions];

            let newByIdSingleQuestion = {};
            for (let question of [singleQuestion]) {
                newByIdSingleQuestion[question.id] = question
            }
            newState.byId = newByIdSingleQuestion;
            return newState;

        case CREATE_A_QUESTION:
            const newQuestion = action.payload;
            newState = { ...state };
            newState.allQuestions = [...state.allQuestions, newQuestion]
            newState.byId = { ...newState.byId, [newQuestion.id]: newQuestion };


        default:
            return state;
    }

}

export default questionReducer;