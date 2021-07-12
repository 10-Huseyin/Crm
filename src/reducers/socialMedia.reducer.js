import {
  GET_SOCIALMEDIA,
  GET_SOCIALMEDIAS,
  ADD_NEW_SOCIALMEDIA,
  DELETE_SOCIALMEDIA,
  EDIT_SOCIALMEDIA,
} from "../actions/actionTypes";

const initialState = {
  socialMediasList: [],
  socialMedia:{}
};

const socialMediasReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_SOCIALMEDIAS:
      return { ...state, socialMediasList: action.payload };
    case GET_SOCIALMEDIA:
      return { ...state, socialMedia: action.payload };
    case ADD_NEW_SOCIALMEDIA:
      return { ...state, socialMediasList: [...state.socialMediasList, action.payload] };
    case DELETE_SOCIALMEDIA:
      return { ...state, message: action.payload };
    case EDIT_SOCIALMEDIA:
      return { ...state, socialMediasList: [...state.socialMediasList, action.payload] };
    default:
      return state;
  }
};
export default socialMediasReducer
