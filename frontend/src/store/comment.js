import { csrfFetch } from "./csrf";

//ACTION TYPES 
const CREATE_A_COMMENT = "reviews/createAComment"
const GET_ALL_COMMENTS = "reviews/getAllComments"
const UPDATE_A_COMMENT = 'review/updateAComment'
const DELETE_A_COMMENT = 'reviews/deleteAComment';


//ACTION CREATORS 

const createAComment = (comment) => ({
    type: CREATE_A_COMMENT,
    payload: comment
});

const getAllComments = (comment) => ({
    type: GET_ALL_COMMENTS,
    payload: comment
})

const updateAComment = (comment) => ({
    type: UPDATE_A_COMMENT,
    payload: comment
})

const deleteAComment = (comment) => ({
    type: DELETE_A_COMMENT,
    payload: comment
});


//THUNKS

//GET ALL COMMENTS
export const getAllCommentsThunk = (questionId) => async (dispatch) => {

    try {
        const res = await fetch(`/api/comments/question/${questionId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw res;
            }
            dispatch(getAllComments(data))
            return data;
        } else {
            throw res;
        }
    } catch (error) {
        console.log(error);
    }
};

//CREATE A COMMENT
export const createACommentThunk = (comment) => async (dispatch) => {
    try {
        const res = await fetch("/api/comments/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(createAComment(data));
            return data
        } else {
            throw res;
        }
    } catch (error) {
        return error;
    }
};




//UPDATE A COMMENT
export const updateACommentThunk = (commentId, comment) => async (dispatch) => {
    try {

        const response = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        });

        if (response.ok) {

            const data = await response.json();
            dispatch(updateAComment(data));
            return data;
        } else {
            throw response;
        }
    } catch (error) {
        return error;
    }
};


//DELETE A COMMENT
export const deleteACommentThunk = (commentId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/comments/${commentId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            dispatch(deleteAComment(commentId));
        } else {
            throw res;
        }
    } catch (error) {
        return error;
    }
};



//INITIAL STATE
const initialState = {
    byId: {},
    allComments: []
};


//REDUCER
function commentReducer(state = initialState, action) {

    let newState;
    switch (action.type) {

        case GET_ALL_COMMENTS:
            const comments = action.payload.Comments
            newState = { ...state };
            newState.allComments = comments

            let newByIdGetAllComments = {};
            for (let comment of comments) {
                newByIdGetAllComments[comment.id] = comment;
            }
            newState.byId = newByIdGetAllComments;
            return newState;


        case CREATE_A_COMMENT:
            newState = { ...state }
            newState.allComments = [...newState.allComments, action.payload]
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload }
            return newState;


        case UPDATE_A_COMMENT:
            newState = { ...state };
            newState.allComments = [...newState.allComments, action.payload];
            newState.byId = { ...newState.byId, [action.payload.id]: action.payload };

            return newState;


        case DELETE_A_COMMENT:
            newState = { ...state };
            newState.allComments = state.allComments.filter(comment => comment.id !== action.payload);
            newState.byId = { ...state.byId };
            delete newState.byId[action.payload];
            return newState;
d

        default:
            return state;
    }
}





export default commentReducer;