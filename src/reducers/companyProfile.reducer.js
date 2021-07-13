import {
  GET_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  ADD_NEW_COMPANY_PROFILE,
  DELETE_COMPANY_PROFILE,
  EDIT_COMPANY_PROFILE,
    TOGGLE_VISIBLE
} from "../actions/actionTypes";

const initialState = {
  profileList: [],
  profile:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_COMPANY_PROFILES:
      return { ...state, profileList: action.payload };
    case GET_COMPANY_PROFILE:
      return { ...state, profile: action.payload };
    case ADD_NEW_COMPANY_PROFILE:
      return { ...state, profileList: [...state.profileList, action.payload] };
    case DELETE_COMPANY_PROFILE:
      return { ...state, profileList: state.profileList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_COMPANY_PROFILE:
      return { ...state, profileList: [...state.profileList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
