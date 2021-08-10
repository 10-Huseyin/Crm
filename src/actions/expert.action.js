import {
    GET_EXPERTS,
    GET_EXPERT,
    ADD_NEW_EXPERT,
    DELETE_EXPERT,
    EDIT_EXPERT,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";
    
  export const getData = (data) => ({
    type: GET_EXPERTS,
    payload: data,
  });
  export function getExperts(limit, page) {
    //console.log(limit, page)
    return (dispatch) => {
      return axios.get(`${API_BASE}experts?limit=${limit}&page=${page}`)
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
    type: GET_EXPERT,
    payload: data,
  });
  export function getOneExpert(id) {
    return (dispatch) => {
      return axios.get(`${API_BASE}experts/${id}`)
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
    type: ADD_NEW_EXPERT,
    payload: data,
  });

  export function addNewExpert(state) {
    console.log("add new expert => ",state);
    return (dispatch) => {
      return axios
        .post(`${API_BASE}experts`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Expert is added succesfully") : "Expert could not added!"
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
    type: DELETE_EXPERT,
    payload: data,
  });
  export function deleteExpert(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}experts/${id}`, {})
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Expert is deleted succesfully") : "Expert is not deleted!"
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
    type: EDIT_EXPERT,
    payload: data,
  });
  export function editExpertData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}experts/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Expert is updated succesfully") : "Expert could not updated!"
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
          payload:axios.put(`${API_BASE}experts/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }