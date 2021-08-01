import {
  GET_SUBSCRIBERS,
  GET_SUBSCRIBER,
  ADD_NEW_SUBSCRIBER,
  DELETE_SUBSCRIBER,
  EDIT_SUBSCRIBER,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  subscriberList: [],
  subscriber:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_SUBSCRIBERS:
      return { ...state, subscriberList: action.payload };
    case GET_SUBSCRIBER:
      return { ...state, subscriber: action.payload };
    case ADD_NEW_SUBSCRIBER:
      return { ...state, subscriberList: [...state.subscriberList, action.payload] };
    case DELETE_SUBSCRIBER:
      return { ...state, subscriberList: state.subscriberList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_SUBSCRIBER:
      return { ...state, subscriberList: [...state.subscriberList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
