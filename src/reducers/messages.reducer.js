import {
  GET_MESSAGES,
  GET_MESSAGE,
  ADD_NEW_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  messageList: [],
  message:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messageList: action.payload };
    case GET_MESSAGE:
      return { ...state, message: action.payload };
    case ADD_NEW_MESSAGE:
      return { ...state, messageList: [...state.messageList, action.payload] };
    case DELETE_MESSAGE:
      return { ...state, messageList: state.messageList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_MESSAGE:
      return { ...state, messageList: [...state.messageList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
