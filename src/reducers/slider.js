import {
  GET_SLIDERS,
  ADD_NEW_SLIDER,
  DELETE_SLIDER,
  EDIT_SLIDER,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  sliderList: [],
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_SLIDERS:
      return { ...state, sliderList: action.payload };
    case ADD_NEW_SLIDER:
      return { ...state, sliderList: [...state.sliderList, action.payload] };
    case DELETE_SLIDER:
      return { ...state, sliderList: action.payload };
    case EDIT_SLIDER:
      return { ...state, sliderList: [...state.sliderList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
