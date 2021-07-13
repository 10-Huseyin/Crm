import {
  GET_COMPANY_INTRO,
  GET_COMPANY_INTROS,
  ADD_NEW_COMPANY_INTRO,
  DELETE_COMPANY_INTRO,
  EDIT_COMPANY_INTRO,
  TOGGLE_VISIBLE
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";

export const getData = (data) => ({
  type: GET_COMPANY_INTROS,
  payload: data,
});
export function getCompanyIntros(limit, page) {
  return (dispatch) => {
    return axios.get(`${API_BASE}companyintroduction?limit=${limit}&page=${page}`)
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
  type: GET_COMPANY_INTRO,
  payload: data,
});
export function getOneIntro(id) {
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
  type: ADD_NEW_COMPANY_INTRO,
  payload: data,
});

export function addCompanyIntro(state) {
  console.log("add new CompanyIntro => ",state);
  return (dispatch) => {
    return axios
      .post(`${API_BASE}companyintroduction`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Company Intro is added succesfully") : "Company Intro could not added!"
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
  type: DELETE_COMPANY_INTRO,
  payload: data,
});
export function deleteCompanyIntro(id) {
  return (dispatch) => {
    return axios
      .delete(`${API_BASE}companyintroduction/${id}`, {})
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Company Intro  is deleted succesfully") : "Company Intro  is not deleted!"
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
  type: EDIT_COMPANY_INTRO,
  payload: data,
});
export function editCompanyIntro(state, id) {
  console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}companyintroduction/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Company Intro is updated succesfully") : "Company Intro could not updated!"
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
        payload:axios.put(`${API_BASE}companyintroduction/${id}`,{})
        .then(res=>console.log(res))
    })
  }
}