import {
    GET_SUBSCRIBERS,
    GET_SUBSCRIBER,
    ADD_NEW_SUBSCRIBER,
    DELETE_SUBSCRIBER,
    EDIT_SUBSCRIBER,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";
    
  export const getData = (data) => ({
    type: GET_SUBSCRIBERS,
    payload: data,
  });
  export function getSubscribers(limit, page) {
    //console.log(limit, page)
    return (dispatch) => {
      return axios.get(`${API_BASE}subscribers?limit=${limit}&page=${page}`)
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
    type: GET_SUBSCRIBER,
    payload: data,
  });
  export function getOneSubscriber(id) {
    return (dispatch) => {
      return axios.get(`${API_BASE}subscribers/${id}`)
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
    type: ADD_NEW_SUBSCRIBER,
    payload: data,
  });

  export function addNewSubscriber(state) {
    console.log("add new subscriber => ",state);
    return (dispatch) => {
      return axios
        .post(`${API_BASE}subscribers`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Subscriber is added succesfully") : "Subscriber could not added!"
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
    type: DELETE_SUBSCRIBER,
    payload: data,
  });
  export function deleteSubscriber(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}subscribers/${id}`, {})
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Subscriber is deleted succesfully") : "Subscriber is not deleted!"
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
    type: EDIT_SUBSCRIBER,
    payload: data,
  });
  export function editSubscriberData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}subscribers/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Subscriber is updated succesfully") : "Subscriber could not updated!"
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
          payload:axios.put(`${API_BASE}subscribers/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }