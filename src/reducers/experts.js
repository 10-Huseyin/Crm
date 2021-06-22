import {
  GET_EXPERTS,
  ADD_NEW_EXPERT,
  DELETE_EXPERT,
  EDIT_EXPERT,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  expertList: [],
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_EXPERTS:
      return { ...state, expertList: action.payload };
    case ADD_NEW_EXPERT:
      return { ...state, expertList: [...state.expertList, action.payload] };
    case DELETE_EXPERT:
      return { ...state, expertList: action.payload };
    case EDIT_EXPERT:
      return { ...state, expertList: [...state.expertList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
