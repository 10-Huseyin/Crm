import {
  GET_EXPERTS,
  GET_EXPERT,
  ADD_NEW_EXPERT,
  DELETE_EXPERT,
  EDIT_EXPERT,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  expertList: [],
  expert:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_EXPERTS:
      return { ...state, expertList: action.payload };
    case GET_EXPERT:
      return { ...state, expert: action.payload };
    case ADD_NEW_EXPERT:
      return { ...state, expertList: [...state.expertList, action.payload] };
    case DELETE_EXPERT:
      return { ...state, expertList: state.expertList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_EXPERT:
      return { ...state, expertList: [...state.expertList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
