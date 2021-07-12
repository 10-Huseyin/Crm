import {
  GET_MEDIAS,
  GET_MEDIA,
  ADD_NEW_MEDIA,
  DELETE_MEDIA,
  EDIT_MEDIA,
} from "../actions/actionTypes";

const initialState = {
  mediasList: [],
};

const mediasReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_MEDIAS:
      return { ...state, mediasList: action.payload };
    case GET_MEDIA:
      return { ...state, media: action.payload };
    case ADD_NEW_MEDIA:
      return { ...state, mediasList: [...state.mediasList, action.payload] };
    case DELETE_MEDIA:
      return { ...state, message: action.payload };
    case EDIT_MEDIA:
      return { ...state, mediasList: [...state.mediasList, action.payload] };
    default:
      return state;
  }
};
export default mediasReducer
