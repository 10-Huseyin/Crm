import {
    GET_EXPERTS,
    ADD_NEW_EXPERT,
    DELETE_EXPERT,
    EDIT_EXPERT,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  
  import axios from "axios";
  //import { API_BASE } from "../Helpers/env";
  
  const API_BASE = "https://crmapp-server.herokuapp.com/experts"
  
  export const getData = (data) => ({
    type: GET_EXPERTS,
    payload: data,
  });
  export function getExperts() {
    return (dispatch) => {
      axios.get(`${API_BASE}`).then((result) => dispatch(getData(result.data)));
    };
  }
  
  export const postData = (data) => ({
    type: ADD_NEW_EXPERT,
    payload: data,
  });
  export function addNewExpert(state) {
    console.log("add new expert => ",state);
    return (dispatch) => {
      axios
        .post(`${API_BASE}`, state)
        .then((result) => {console.log(result);dispatch(postData(result.data))})
        .catch((error) => console.log(error));
    };
  }
  
  export const removeData = (data) => ({
    type: DELETE_EXPERT,
    payload: data,
  });
  export function deleteExpert(id) {
    return (dispatch) => {
      axios
        .delete(`${API_BASE}/${id}`, {})
        .then((result) => dispatch(removeData(result.data)));
    };
  }
  
  export const editData = (data) => ({
    type: EDIT_EXPERT,
    payload: data,
  });
  export function editExpertData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      axios
        .put(`${API_BASE}/${id}`, state)
        .then((result) =>{
          console.log(result.data)
          dispatch(editData(result.data)
          )}
          )
              // .then((res) => console.log(res))
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