import {
  GET_MENUS,
  GET_MENU,
  ADD_NEW_MENU,
  DELETE_MENU,
  EDIT_MENU,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  menuList: [],
  menu:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_MENUS:
      return { ...state, menuList: action.payload };
    case GET_MENU:
      return { ...state, menu: action.payload };
    case ADD_NEW_MENU:
      return { ...state, menuList: [...state.menuList, action.payload] };
    case DELETE_MENU:
      return { ...state, menuList: state.menuList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_MENU:
      return { ...state, menuList: [...state.menuList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
