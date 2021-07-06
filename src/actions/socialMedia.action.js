import {
  GET_SOCIALMEDIAS,
  ADD_NEW_SOCIALMEDIA,
  DELETE_SOCIALMEDIA,
  EDIT_SOCIALMEDIA,
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";

const API_BASE = "https://crmapp-server.herokuapp.com/socialMedia"

export const getData = (data) => ({
  type: GET_SOCIALMEDIAS,
  payload: data,
});
export function getSocialMedias(limit, page) {
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
  type: ADD_NEW_SOCIALMEDIA,
  payload: data,
});

export function addNewSocialMedia(state) {
  console.log("add new socialMedia => ",state);
  return (dispatch) => {
    return axios
      .post(`${API_BASE}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "SocialMedia is added succesfully") : "SocialMedia could not added!"
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
  type: DELETE_SOCIALMEDIA,
  payload: data,
});
export function deleteSocialMedia(id) {
  return (dispatch) => {
    return axios
      .delete(`${API_BASE}/${id}`, {})
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "SocialMedia is deleted succesfully") : "SocialMedia is not deleted!"
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
  type: EDIT_SOCIALMEDIA,
  payload: data,
});
export function editSocialMediaData(state, id) {
  console.log(state,id);
  return (dispatch) => {
    return axios
      .put(`${API_BASE}/${id}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "SocialMedia is updated succesfully") : "SocialMedia could not updated!"
        setMessage(msg,dispatch)
      },
        (error)=> {
          setError(error, dispatch)
        return error
      })
        .catch((error) => error);
  };
}
