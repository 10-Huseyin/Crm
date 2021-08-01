import {
    GET_SECTIONS,
    GET_SECTION,
    ADD_NEW_SECTION,
    DELETE_SECTION,
    EDIT_SECTION,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";
    
  export const getData = (data) => ({
    type: GET_SECTIONS,
    payload: data,
  });
  export function getSections(limit, page) {
    //console.log(limit, page)
    return (dispatch) => {
      return axios.get(`${API_BASE}sections?limit=${limit}&page=${page}`)
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
    type: GET_SECTION,
    payload: data,
  });
  export function getOneSection(id) {
    return (dispatch) => {
      return axios.get(`${API_BASE}sections/${id}`)
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
    type: ADD_NEW_SECTION,
    payload: data,
  });

  export function addNewSection(state) {
    console.log("add new section => ",state);
    return (dispatch) => {
      return axios
        .post(`${API_BASE}sections`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Section is added succesfully") : "Section could not added!"
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
    type: DELETE_SECTION,
    payload: data,
  });
  export function deleteSection(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}sections/${id}`, {})
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Section is deleted succesfully") : "Section is not deleted!"
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
    type: EDIT_SECTION,
    payload: data,
  });
  export function editSectionData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}sections/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Section is updated succesfully") : "Section could not updated!"
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
          payload:axios.put(`${API_BASE}sections/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }