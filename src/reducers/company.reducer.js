import {
  GET_COMPANY_INTRO,
  GET_COMPANY_INTROS,
  ADD_NEW_COMPANY_INTRO,
  DELETE_COMPANY_INTRO,
  EDIT_COMPANY_INTRO,
  TOGGLE_VISIBLE
} from "../actions/actionTypes";

const initialState = {
  companyIntroList: [],
  companyIntro: {}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_COMPANY_INTRO:
      return { ...state, companyIntro: action.payload };
    case GET_COMPANY_INTROS:
      return { ...state, companyIntroList: action.payload };
    case ADD_NEW_COMPANY_INTRO:
      return { ...state, companyIntroList: [...state.expertList, action.payload] };
    case DELETE_COMPANY_INTRO:
      return { ...state, companyIntroList: state.companyIntroList.filter((item)=>item._id !== action.payload.data._id)};
    case EDIT_COMPANY_INTRO:
      return { ...state, companyIntroList: [...state.expertList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
