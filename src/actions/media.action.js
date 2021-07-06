import {
  GET_MEDIAS,
  ADD_NEW_MEDIA,
  DELETE_MEDIA,
  EDIT_MEDIA,
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";

const API_BASE = "https://crmapp-server.herokuapp.com/medias"

export const getData = (data) => ({
  type: GET_MEDIAS,
  payload: data,
});
export function getMedias(limit, page) {
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
  type: ADD_NEW_MEDIA,
  payload: data,
});

export function addNewMedia(state) {
  console.log("add new media => ",state);
  return (dispatch) => {
    return axios
      .post(`${API_BASE}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Media is added succesfully") : "Media could not added!"
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
  type: DELETE_MEDIA,
  payload: data,
});
export function deleteMedia(id) {
  return (dispatch) => {
    return axios
      .delete(`${API_BASE}/${id}`, {})
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Media is deleted succesfully") : "Media is not deleted!"
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
  type: EDIT_MEDIA,
  payload: data,
});
export function editMediaData(state, id) {
  console.log(state,id);
  return (dispatch) => {
    return axios
      .put(`${API_BASE}/${id}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Media is updated succesfully") : "Media could not updated!"
        setMessage(msg,dispatch)
      },
        (error)=> {
          setError(error, dispatch)
        return error
      })
        .catch((error) => error);
  };
}
