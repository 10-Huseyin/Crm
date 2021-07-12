import {
  GET_ROLES,
  GET_ROLE,
  ADD_NEW_ROLE,
  DELETE_ROLE,
  EDIT_ROLE,
  TOGGLE_VISIBLE
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";


export const getData = (data) => ({
  type: GET_ROLES,
  payload: data,
});
export function getRoles(limit, page) {
  //console.log(limit, page)
  return (dispatch) => {
    return axios.get(`${API_BASE}roles?limit=${limit}&page=${page}`)
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
  type: GET_ROLE,
  payload: data,
});
export function getOneRole(id) {
console.log("getonerole")
  return (dispatch) => {
    return axios.get(`${API_BASE}roles/${id}`)
    .then((result) => {
      console.log(result);
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
  type: ADD_NEW_ROLE,
  payload: data,
});

export function addNewRole(state) {
  console.log("add new role => ",state);
  return (dispatch) => {
    return axios
      .post(`${API_BASE}roles`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Role is added succesfully") : "Role could not added!"
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
  type: DELETE_ROLE,
  payload: data,
});
export function deleteRole(id) {
  return (dispatch) => {
    return axios
      .delete(`${API_BASE}roles/${id}`, {})
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Role is deleted succesfully") : "Role is not deleted!"
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
  type: EDIT_ROLE,
  payload: data,
});
export function editRoleData(state, id) {
  console.log(state,id);
  return (dispatch) => {
    return axios
      .put(`${API_BASE}roles/${id}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Role is updated succesfully") : "Role could not updated!"
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
        payload:axios.put(`${API_BASE}roles/${id}`,{})
        .then(res=>console.log(res))
    })
  }
}
