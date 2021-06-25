import {
    GET_USERS,
    ADD_NEW_USER,
    DELETE_USER,
    EDIT_USER,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import { setMessage, setError } from "./message";
  
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
        .then((response)=>{setMessage(response.data.message,dispatch)},
        (error)=> {setError(error, dispatch)})
        .catch((error) => console.log(error));
    };
  }
  
  export const removeData = (data) => ({
    type: DELETE_USER,
    payload: data,
  });

  export function deleteUser(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}/${id}`, {})
        .then((response)=>{setMessage(response.data.message,dispatch)},
        (error)=> {setError(error, dispatch)})
        .catch((error) => console.log(error));
    };
  }
  
  export const editData = (data) => ({
    type: EDIT_USER,
    payload: data,
  });
  export function editUserData(state, id) {
    //console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}/${id}`, state)
        .then((response)=>{setMessage(response.data.message,dispatch)},
        (error)=> {setError(error, dispatch)})
        .catch((error) => console.log(error));
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