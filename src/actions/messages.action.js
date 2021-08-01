import {
    GET_MESSAGES,
    GET_MESSAGE,
    ADD_NEW_MESSAGE,
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";
    
  export const getData = (data) => ({
    type: GET_MESSAGES,
    payload: data,
  });
  export function getMessages(limit, page) {
    //console.log(limit, page)
    return (dispatch) => {
      return axios.get(`${API_BASE}messages?limit=${limit}&page=${page}`)
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
    type: GET_MESSAGE,
    payload: data,
  });
  export function getOneMessage(id) {
    return (dispatch) => {
      return axios.get(`${API_BASE}messages/${id}`)
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
    type: ADD_NEW_MESSAGE,
    payload: data,
  });

  export function addNewMessage(state) {
    console.log("add new message => ",state);
    return (dispatch) => {
      return axios
        .post(`${API_BASE}messages`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Message is added succesfully") : "Message could not added!"
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
    type: DELETE_MESSAGE,
    payload: data,
  });
  export function deleteMessage(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}messages/${id}`, {})
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Message is deleted succesfully") : "Message is not deleted!"
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
    type: EDIT_MESSAGE,
    payload: data,
  });
  export function editMessageData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}messages/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Message is updated succesfully") : "Message could not updated!"
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
          payload:axios.put(`${API_BASE}messages/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }