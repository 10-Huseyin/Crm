import {
  GET_SOCIALMEDIA,
  GET_SOCIALMEDIAS,
  ADD_NEW_SOCIALMEDIA,
  DELETE_SOCIALMEDIA,
  EDIT_SOCIALMEDIA,
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";


export const getData = (data) => ({
  type: GET_SOCIALMEDIAS,
  payload: data,
});
export function getSocialMedias(limit, page) {
  //console.log(limit, page)
  return (dispatch) => {
    return axios.get(`${API_BASE}socialMedia?limit=${limit}&page=${page}`)
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
  type: GET_SOCIALMEDIA,
  payload: data,
});
export function getOneSocialMedia(id) {
  return (dispatch) => {
    return axios.get(`${API_BASE}socialMedia/${id}`)
    .then((result) => {
      //console.log(result);
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
  type: ADD_NEW_SOCIALMEDIA,
  payload: data,
});

export function addNewSocialMedia(state) {
  console.log("add new socialMedia => ",state);
  return (dispatch) => {
    return axios
      .post(`${API_BASE}socialMedia`, state)
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
      .delete(`${API_BASE}socialMedia/${id}`, {})
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
      .put(`${API_BASE}socialMedia/${id}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "SocialMedia is updated succesfully") : "SocialMedia could not updated!"
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

const socialArr = ["twitter", "linkedin", "flickr", "tumblr", "xing", "github", "stackoverflow", "youtube", "dribbble", "instagram", "pinterest", "vk", "yahoo", "behance", "reddit", "vimeo"]

  export function handleOne () {
    const fdata = new FormData();
    
    socialArr.forEach(item => {
      
      fdata.set("link", `https://${item}.com/`);
      fdata.set("title", item.toUpperCase());
      fdata.set("isActive", true);
      fdata.set("isDeleted", false);
      console.log(fdata);
      return () => {
        return axios
          .post(`${API_BASE}socialMedia`, fdata)
      }
    });
  
  };