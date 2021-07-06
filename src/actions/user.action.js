import {
  GET_USERS,
  ADD_NEW_USER,
  DELETE_USER,
  EDIT_USER,
  GET_ROLES,
  TOGGLE_VISIBLE
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";
//import { API_BASE } from "../Helpers/env";

const API_BASE = "https://crmapp-server.herokuapp.com/users"
const ROLE_BASE = "https://crmapp-server.herokuapp.com/roles"

export const getData = (data) => ({
  type: GET_USERS,
  payload: data,
});
export function getUsers(limit, page) {
  //console.log(limit, page)
  return (dispatch) => {
    return axios.get(`${API_BASE}?limit=${limit}&page=${page}`)
    .then((result) => {
      //console.log(result);
      dispatch(setPagination({page:result.data.pages, total:result.data.total}));
      dispatch(getData(result.data.response))
      return result.data.status;
    },
    (error)=> {
      setError(error, dispatch)
    return error
  })
    .catch((error) => error);
  };
}

export const postData = (data) => ({
  type: ADD_NEW_USER,
  payload: data,
});

export function addNewUser(state) {
  console.log("add new user => ",state);
  return (dispatch) => {
    return axios
      .post(`${API_BASE}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "User is added succesfully") : "User could not added!"
        setMessage(msg,dispatch)
        return response.data.status
      },
      (error)=> {
        setError(error, dispatch)
      return error
    })
      .catch((error) => error);
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
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "User is deleted succesfully") : "User is not deleted!"
        setMessage(msg,dispatch)
        return response.data.status
      }
        ,
        (error)=> {
          setError(error, dispatch)
        return error
      })
        .catch((error) => error);
  };
}

export const editData = (data) => ({
  type: EDIT_USER,
  payload: data,
});
export function editUserData(state, id) {
  console.log("edit user => ",state, id);
  return (dispatch) => {
    return axios
      .put(`${API_BASE}/${id}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "User is updated succesfully") : "User could not updated!"
        setMessage(msg,dispatch)
      },
        (error)=> {
          setError(error, dispatch)
        return error
      })
        .catch((error) => error);
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


export const getRoleData = (data) => ({
  type: GET_ROLES,
  payload: data,
});
export function getRoles() {
  return (dispatch) => {
    return axios.get(`${ROLE_BASE}`)
    .then((result) => {
      //console.log(result);
      dispatch(getRoleData(result.data.response))
      return result.data.status;
    },
    (error)=> {
      setError(error, dispatch)
    return error
  })
    .catch((error) => error);
  };
}