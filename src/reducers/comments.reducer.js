import {
  GET_COMMENTS,
  GET_COMMENT,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  commentList: [],
  comment:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, commentList: action.payload };
    case GET_COMMENT:
      return { ...state, comment: action.payload };
    case ADD_NEW_COMMENT:
      return { ...state, commentList: [...state.commentList, action.payload] };
    case DELETE_COMMENT:
      return { ...state, commentList: state.commentList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_COMMENT:
      return { ...state, commentList: [...state.commentList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
