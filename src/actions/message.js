import { SET_MESSAGE, CLEAR_MESSAGE } from "./type";

// export const setMessage = (message) => ({
//   type: SET_MESSAGE,
//   payload: message,
// });

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const setMessage = (message, dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
  setTimeout(() => {
    dispatch({
      type: CLEAR_MESSAGE,
    });
  }, 3000);
  return Promise.resolve();
}
export const setError = (error, dispatch) => {
  const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
  setTimeout(() => {
    dispatch({
      type: CLEAR_MESSAGE,
    });
  }, 3000);    
  return Promise.reject();
}
