import {
  GET_COMPANY_INTROS,
  ADD_NEW_COMPANY_INTRO,
  DELETE_COMPANY_INTRO,
  EDIT_COMPANY_INTRO,
  TOGGLE_VISIBLE
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError } from "./message";
//import { API_BASE } from "../Helpers/env";

const API_BASE = "https://crmapp-server.herokuapp.com/companyintroduction"

export const getData = (data) => ({
  type: GET_COMPANY_INTROS,
  payload: data,
});
export function getCompanyIntro() {
  return (dispatch) => {
    axios.get(`${API_BASE}`).then((result) => dispatch(getData(result.data)));
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
      .post(`${API_BASE}`, state)
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
      .delete(`${API_BASE}/${id}`, {})
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
      .put(`${API_BASE}/${id}`, state)
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
        payload:axios.put(`${API_BASE}/${id}`,{})
        .then(res=>console.log(res))
    })
  }
}