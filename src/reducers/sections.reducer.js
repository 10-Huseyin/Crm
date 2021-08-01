import {
  GET_SECTIONS,
  GET_SECTION,
  ADD_NEW_SECTION,
  DELETE_SECTION,
  EDIT_SECTION,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  sectionList: [],
  section:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_SECTIONS:
      return { ...state, sectionList: action.payload };
    case GET_SECTION:
      return { ...state, section: action.payload };
    case ADD_NEW_SECTION:
      return { ...state, sectionList: [...state.sectionList, action.payload] };
    case DELETE_SECTION:
      return { ...state, sectionList: state.sectionList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_SECTION:
      return { ...state, sectionList: [...state.sectionList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
