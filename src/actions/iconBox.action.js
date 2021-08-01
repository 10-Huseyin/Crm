import {
    GET_ICONBOXES,
    GET_ICONBOX,
    ADD_NEW_ICONBOX,
    DELETE_ICONBOX,
    EDIT_ICONBOX,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";
    
  export const getData = (data) => ({
    type: GET_ICONBOXES,
    payload: data,
  });
  export function getIconBoxes(limit, page) {
    //console.log(limit, page)
    return (dispatch) => {
      return axios.get(`${API_BASE}iconbox?limit=${limit}&page=${page}`)
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
    type: GET_ICONBOX,
    payload: data,
  });
  export function getOneIconBox(id) {
    return (dispatch) => {
      return axios.get(`${API_BASE}iconbox/${id}`)
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
    type: ADD_NEW_ICONBOX,
    payload: data,
  });

  export function addNewIconBox(state) {
    console.log("add new iconBox => ",state);
    return (dispatch) => {
      return axios
        .post(`${API_BASE}iconbox`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "IconBox is added succesfully") : "IconBox could not added!"
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
    type: DELETE_ICONBOX,
    payload: data,
  });
  export function deleteIconBox(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}iconbox/${id}`, {})
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "IconBox is deleted succesfully") : "IconBox is not deleted!"
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
    type: EDIT_ICONBOX,
    payload: data,
  });
  export function editIconBoxData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}iconbox/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "IconBox is updated succesfully") : "IconBox could not updated!"
          setMessage(msg,dispatch)
          return response.data.status;
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
          payload:axios.put(`${API_BASE}iconbox/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }