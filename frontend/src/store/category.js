// Imports
import { csrfFetch } from "./csrf";



// ACTION TYPES
const GET_ALL_CATEGORIES = 'category/getAllCategories';
// const GET_A_QUESTION = 'question/getAQuestion';
// const CREATE_A_QUESTION = 'question/createAQuestion';
// const UPDATE_A_QUESTION = 'question/updateAQuestion';
// const DELETE_A_QUESTION = 'question/deleteAQuestion';

// ACTION CREATIONS
const getAllCategoriesAction = (data) => ({
    type: GET_ALL_CATEGORIES,
    payload: data
});

// const getAQuestion = (data) => ({

//     type: GET_A_QUESTION,
//     payload: data
// });

// const createAQuestion = (data) => ({
//     type: CREATE_A_QUESTION,
//     payload: data
// });

// const updateAQuestion = (data) => ({
//     type: UPDATE_A_QUESTION,
//     payload: data
// });

// const deleteAQuestion = (data) => ({
//     type: DELETE_A_QUESTION,
//     payload: data
// });


// THUNK

//GET ALL QUESTIONS
export const getAllCategoriesThunk = () => async (dispatch) => {

    try {
        const res = await csrfFetch('/api/categories/');

        if (res.ok) {
            const data = await res.json();
            dispatch(getAllCategoriesAction(data))
        } else {
            throw res;
        }
    } catch (error) {
        console.log(error);
    }
};



//INITIAL STATE
const initialState = {
    allCategories: [],
    // byId: {}
};


// REDUCERS
function categoryReducer(state = initialState, action) {
    let newState;

    switch (action.type) {

        case GET_ALL_CATEGORIES: {
            const categoriesArr = action.payload.categories;
            newState = { ...state };
            newState.allCategories = categoriesArr;

            // let newByIdQuestion = {};
            // for (let question of questionArr) {
            //     newByIdQuestion[question.id] = question;
            // }

            // newState.byId = newByIdQuestion;

            return newState;

        }


        

        default:
            return state;
    }

}

export default categoryReducer;