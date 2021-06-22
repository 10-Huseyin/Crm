import {
  GET_USERS,
  ADD_NEW_USER,
  DELETE_USER,
  EDIT_USER,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  userList: [],
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_USERS:
      return { ...state, userList: action.payload };
    case ADD_NEW_USER:
      return { ...state, userList: [...state.userList, action.payload] };
    case DELETE_USER:
      return { ...state, message: action.payload };
    case EDIT_USER:
      return { ...state, userList: [...state.userList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
