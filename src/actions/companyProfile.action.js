import {
  GET_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  ADD_NEW_COMPANY_PROFILE,
  DELETE_COMPANY_PROFILE,
  EDIT_COMPANY_PROFILE,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";
    
  export const getData = (data) => ({
    type: GET_COMPANY_PROFILES,
    payload: data,
  });
  export function getProfiles(limit, page) {
    //console.log(limit, page)
    return (dispatch) => {
      return axios.get(`${API_BASE}companyprofile?limit=${limit}&page=${page}`)
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
    type: GET_COMPANY_PROFILE,
    payload: data,
  });
  export function getOneProfile(id) {
    return (dispatch) => {
      return axios.get(`${API_BASE}companyprofile/${id}`)
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
    type: ADD_NEW_COMPANY_PROFILE,
    payload: data,
  });

  export function addNewProfile(state) {
    console.log("add new profile => ",state);
    return (dispatch) => {
      return axios
        .post(`${API_BASE}companyprofile`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Profile is added succesfully") : "Profile could not added!"
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
    type: DELETE_COMPANY_PROFILE,
    payload: data,
  });
  export function deleteProfile(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}companyprofile/${id}`, {})
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Profile is deleted succesfully") : "Profile is not deleted!"
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
    type: EDIT_COMPANY_PROFILE,
    payload: data,
  });
  export function editProfileData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}companyprofile/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Profile is updated succesfully") : "Profile could not updated!"
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
          payload:axios.put(`${API_BASE}companyprofile/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }