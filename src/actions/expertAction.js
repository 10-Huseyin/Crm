import {
    GET_EXPERTS,
    ADD_NEW_EXPERT,
    DELETE_EXPERT,
    EDIT_EXPERT,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError } from "./message";
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
      return axios
        .post(`${API_BASE}`, state)
        .then((response)=>{
          console.log(response);
          setMessage(response.data.message,dispatch)

        },
        (error)=> {setError(error, dispatch)})
        .catch((error) => console.log(error));
    };
  }
  
  export const removeData = (data) => ({
    type: DELETE_EXPERT,
    payload: data,
  });
  export function deleteExpert(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}/${id}`, {})
        .then((response)=>{
          console.log(response)
          //removeData(response.data)
          let msg = response.data.message ? response.data.message : "Expert is deleted succesfully"
          setMessage(msg,dispatch)},
        (error)=> {setError(error, dispatch)})
        .catch((error) => console.log(error));
    };
  }
  
  export const editData = (data) => ({
    type: EDIT_EXPERT,
    payload: data,
  });
  export function editExpertData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.message ? response.data.message : "Expert updated succesfully"
          setMessage(msg,dispatch)},
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