import {
  GET_USERS,
  GET_USER,
  ADD_NEW_USER,
  DELETE_USER,
  EDIT_USER,
  TOGGLE_VISIBLE
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";


export const getData = (data) => ({
  type: GET_USERS,
  payload: data,
});
export function getUsers(limit, page) {
  //console.log(limit, page)
  return (dispatch) => {
    return axios.get(`${API_BASE}users?limit=${limit}&page=${page}`)
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

export const getOneData = (data) => ({
  type: GET_USER,
  payload: data,
});
export function getOneUser(id) {
  return (dispatch) => {
    return axios.get(`${API_BASE}users/${id}`)
    .then((result) => {
      console.log(result.data.data);
      dispatch(getOneData(result.data.data))
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
  console.log(state.getAll('mediaId'))

  return (dispatch) => {
    return axios
      .post(`${API_BASE}users`, state)
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
      .delete(`${API_BASE}users/${id}`, {})
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
      .put(`${API_BASE}users/${id}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "User is updated succesfully") : "User could not updated!"
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

export function toggleVisible(id) {

  return (dispatch) => {
    dispatch({
        type:TOGGLE_VISIBLE,
        payload:axios.put(`${API_BASE}users/${id}`,{})
        .then(res=>console.log(res))
    })
  }
} 