import {
    GET_USERS,
    ADD_NEW_USER,
    DELETE_USER,
    EDIT_USER,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import {SET_MESSAGE, CLEAR_MESSAGE} from "./type";
  
  import axios from "axios";
  //import { API_BASE } from "../Helpers/env";
  
  const API_BASE = "https://crmapp-server.herokuapp.com/users"
  
  export const getData = (data) => ({
    type: GET_USERS,
    payload: data,
  });
  export function getUsers() {
    return (dispatch) => {
      axios.get(`${API_BASE}`).then((result) => dispatch(getData(result.data)));
    };
  }
  
  export const postData = (data) => ({
    type: ADD_NEW_USER,
    payload: data,
  });
  export function addNewUser(state) {
    console.log("add new user => ",state);
    return (dispatch) => {
      axios
        .post(`${API_BASE}`, state)
        .then((result) => {console.log(result);dispatch(postData(result.data))})
        .catch((error) => console.log(error));
    };
  }
  
  export const removeData = (data) => ({
    type: DELETE_USER,
    payload: data,
  });

  export function deleteUser(id) {
    return (dispatch) => {
      axios
        .delete(`${API_BASE}/${id}`, {})
        .then((response) => {
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
          setTimeout(() => {
            dispatch({
              type: CLEAR_MESSAGE,
            });
          }, 3000);
          return Promise.resolve();
        },
        (error) => {
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
        );
    };
  }
  
  export const editData = (data) => ({
    type: EDIT_USER,
    payload: data,
  });
  export function editUserData(state, id) {
    //console.log(state,id);
    return (dispatch) => {
      axios
        .put(`${API_BASE}/${id}`, state)
          .then((response) => {
            dispatch({
              type: SET_MESSAGE,
              payload: response.data.message,
            });
            setTimeout(() => {
              dispatch({
                type: CLEAR_MESSAGE,
              });
            }, 3000);
            return Promise.resolve();
          },
          (error) => {
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
          );
    };
  }
  export function toggleVisible(id) {
  
    return (dispatch) => {
      dispatch({
          type:TOGGLE_VISIBLE,
          payload:axios.put(`${API_BASE}/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }