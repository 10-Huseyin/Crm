import { SET_PAGINATION } from "../actions/actionTypes";

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PAGINATION:
      return  payload ;

    default:
      return state;
  }
}