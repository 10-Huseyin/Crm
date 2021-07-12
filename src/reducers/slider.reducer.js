import {
  GET_SLIDERS,
  ADD_NEW_SLIDER,
  GET_SLIDER,
  DELETE_SLIDER,
  EDIT_SLIDER,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  sliderList: [],
  slider:{},
};

export default (state = initialState, action) => {
 
  switch (action.type) {
    case GET_SLIDERS:
      return { ...state, sliderList: action.payload};
      case GET_SLIDER:
        return { ...state, slider: action.payload};
    case ADD_NEW_SLIDER:
      return { ...state, sliderList: [...state.sliderList, action.payload] };
    case DELETE_SLIDER:
      return { ...state, sliderList: state.sliderList.filter((item)=>item._id !== action.payload.data._id)};
    case EDIT_SLIDER:
      return { ...state, sliderList: [...state.sliderList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
