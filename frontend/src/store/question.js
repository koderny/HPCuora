// Imports
import { csrfFetch } from "./csrf";



// ACTION TYPES
const GET_ALL_QUESTIONS = 'question/getAllQuestions';
const GET_A_QUESTION = 'question/getAQuestion';
const CREATE_A_QUESTION = 'question/createAQuestion';
const UPDATE_A_QUESTION = 'question/updateAQuestion';
const DELETE_A_QUESTION = 'question/deleteAQuestion';

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
});

const updateAQuestion = (data) => ({
    type: UPDATE_A_QUESTION,
    payload: data
});

const deleteAQuestion = (data) => ({
    type: DELETE_A_QUESTION,
    payload: data
});


// THUNK

//GET ALL QUESTIONS
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
            dispatch(getAQuestion(data));
        }
    } catch (error) {
        console.log(error)
    }
}

//CREATE A QUESTION
export const createAQuestionThunk = (question) => async (dispatch) => {
    console.log(question);
    try {
        const res = await csrfFetch('/api/questions', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(question),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createAQuestion(data));
            // getAllQuestionsThunk();
            return data;
        }

        throw res;
    } catch (error) {
        return error;
    }
};

//UPDATE A QUESTION
export const updateAQuestionThunk = (questionId, question) => async (dispatch) => {
    console.log(questionId, question)
    try {

        const response = await csrfFetch(`/api/questions/${questionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(question)
        });

        if (response.ok) {

            const data = await response.json();
            dispatch(updateAQuestion(data));
        } else {
            throw response;
        }
    } catch (error) {
        return error;
    }
};

//DELETE A QUESTION
export const deleteAQuestionThunk = (questionId) => async (dispatch) => {
    console.log("triggerd")
    try {
        const res = await csrfFetch(`/api/questions/${questionId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            dispatch(deleteAQuestion(questionId));
        } else {
            throw res;
        }
    } catch (error) {
        return error;
    }
};



//INITIAL STATE
const initialState = {
    allQuestions: [],
    byId: {}
};


// REDUCERS
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


        case UPDATE_A_QUESTION:
            newState = { ...state };
            newState.allQuestions = [...newState.allQuestions, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

            return newState;

            
        case DELETE_A_QUESTION:
            newState = { ...state };
            newState.allQuestions = state.allQuestions.filter((question) => question.id !== action.payload);
            newState.byId = { ...state.byId };
            delete newState.byId[action.payload];
            return newState;

        default:
            return state;
    }

}

export default questionReducer;