import {
  GET_ICONBOXES,
  GET_ICONBOX,
  ADD_NEW_ICONBOX,
  DELETE_ICONBOX,
  EDIT_ICONBOX,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  iconBoxList: [],
  iconBox:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_ICONBOXES:
      return { ...state, iconBoxList: action.payload };
    case GET_ICONBOX:
      return { ...state, iconBox: action.payload };
    case ADD_NEW_ICONBOX:
      return { ...state, iconBoxList: [...state.iconBoxList, action.payload] };
    case DELETE_ICONBOX:
      return { ...state, iconBoxList: state.iconBoxList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_ICONBOX:
      return { ...state, iconBoxList: [...state.iconBoxList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
