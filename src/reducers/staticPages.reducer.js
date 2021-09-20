import {
  GET_STATICPAGES,
  GET_STATICPAGE,
  ADD_NEW_STATICPAGE,
  DELETE_STATICPAGE,
  EDIT_STATICPAGE,
} from "../actions/actionTypes";

const initialState = {
  staticPagesList: [],
  staticPage:{}
};

const staticPagesReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_STATICPAGES:
      return { ...state, staticPagesList: action.payload };
    case GET_STATICPAGE:
      return { ...state, staticPage: action.payload };
    case ADD_NEW_STATICPAGE:
      return { ...state, staticPagesList: [...state.staticPagesList, action.payload] };
    case DELETE_STATICPAGE:
      return { ...state, message: action.payload };
    case EDIT_STATICPAGE:
      return { ...state, staticPagesList: [...state.staticPagesList, action.payload] };
    default:
      return state;
  }
};
export default staticPagesReducer
