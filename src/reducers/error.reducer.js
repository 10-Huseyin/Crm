import { SET_ERROR, CLEAR_ERROR } from "../actions/actionTypes";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR:
      return  payload ;

    case CLEAR_ERROR:
      return  "" ;

    default:
      return state;
  }
}