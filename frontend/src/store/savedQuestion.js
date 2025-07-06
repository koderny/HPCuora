
// IMPORTS
import { csrfFetch } from "./csrf";


// ACTION TYPES 
const GET_ALL_FAVORITES = "favorites/getAllFavorites";
const ADD_FAVORITE = "favorites/addFavorite";
const DELETE_FAVORITE = "favorites/deleteFavorite";



// ACTION CREATORS

const getAllFavorites = (favorites) => ({
  type: GET_ALL_FAVORITES,
  payload: favorites,
});

const addFavorite = (favorites) => ({
  type: ADD_FAVORITE,
  payload: favorites,
});

const deleteFavorite = (favorite) => ({
  type: DELETE_FAVORITE,
  payload: favorite,
});



// THUNKS 

export const getAllFavoritesThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/favorites');
    if (res.ok) {
      const data = await res.json();
      if (data.errors) {
        throw res;
      }
      dispatch(getAllFavorites(data))
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const addFavoritesThunk = (questionId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/favorites/${questionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addFavorite(data));
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const deleteFavoriteThunk = (questionId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/favorites/${questionId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      const data = await res.json();
      // dispatch(deleteFavorite(questionId));
      dispatch(getAllFavoritesThunk());

      return data;
    }
  } catch (error) {
    return error;
  }
};



// INITIAL STATE

const initialState = {
  byId: {},
  allFavorites: []
};

// REDUCER 

function favoritesReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_ALL_FAVORITES:
      const favorites = action.payload.Questions;
      console.log(favorites, "favorites in store")
      newState = { ...state };
      newState.allFavorites = favorites;

      let newByIdGetAllFavorites = {};
      for (let favorite of favorites) {
        newByIdGetAllFavorites[favorite.favQuestion.id] = favorite;
      }
      newState.byId = newByIdGetAllFavorites;
      newState.allFavorites = favorites;
      return newState;

    case ADD_FAVORITE:
      newState = { ...state }
      newState.allFavorites = [...newState.allFavorites, action.payload]
      newState.byId = { ...newState.byId, [action.payload.questionId]: action.payload }
      return newState;

    case DELETE_FAVORITE:
      newState = { ...state };
      newState.allFavorites = state.allFavorites.filter((favorite) => favorite.questionId !== action.payload);
      newState.byId = { ...state.byId }
      delete newState.byId[action.payload];
      console.log(newState, "delete state")
      return newState;

    default:
      return state;


  }
}

export default favoritesReducer;