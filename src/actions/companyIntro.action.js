import {
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
export function getCompanyIntro(limit, page) {
  console.log(limit, page)
  return (dispatch) => {
    axios.get(`${API_BASE}companyintroduction?limit=${limit}&page=${page}`).then((result) => {
      console.log(result);
      dispatch(setPagination({page:result.data.pages, total:result.data.total}));
      dispatch(getData(result.data.response))});
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
      .then((response)=>{console.log(response);  setMessage(response.data.message,dispatch)},
      (error)=> {setError(error, dispatch)})
      .catch((error) => console.log(error));
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
        let msg = response.data.message ? response.data.message : "CompanyIntro deleted succesfully"
        setMessage(msg,dispatch)},
      (error)=> {setError(error, dispatch)})
      .catch((error) => console.log(error));
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
        let msg = response.data.message ? response.data.message : "CompanyIntro updated succesfully"
        setMessage(msg,dispatch)},
      (error)=> {setError(error, dispatch)})
      .catch((error) => console.log(error));
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