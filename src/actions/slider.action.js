import {
  GET_SLIDERS,
  ADD_NEW_SLIDER,
  DELETE_SLIDER,
  EDIT_SLIDER,
  TOGGLE_VISIBLE
} from "./actionTypes";
import { setMessage, setError } from "./message.action";
import axios from "axios";
//import { API_BASE } from "../Helpers/env";

const API_BASE = "https://crmapp-server.herokuapp.com/slider/?limit=3&page=1"

export const getData = (data) => ({
  type: GET_SLIDERS,
  payload: data,
});

export function getSlider() {
  return (dispatch) => {
    return axios.get(`${API_BASE}`).then((result) => dispatch(getData(result.data),
  
    ));
  };
}

export const postData = (data) => ({
  type: ADD_NEW_SLIDER,
  payload: data,
});
export function addNewSlider(state) {
  console.log("add new slider => ",state);
  return (dispatch) => {
   return axios
      .post(`${API_BASE}`, state)
      .then((result) => {console.log(result);dispatch(postData(result.data))})
      .catch((error) => console.log(error));
  };
}

// export const removeData = (data) => ({
//   type: DELETE_SLIDER,
//   payload: data,
// });
export function deleteSlider(id) {
  return (dispatch) => {
    return axios
      .delete(`${API_BASE}/${id}`, {})
      .then((response)=>{
        console.log(response)
        //removeData(response.data)
        let msg = response.data.message ? response.data.message : "Slider is deleted succesfully"
        setMessage(msg,dispatch)},
      (error)=> {setError(error, dispatch)})
      .catch((error) => console.log(error));
  };
}

export const editData = (data) => ({
  type: EDIT_SLIDER,
  payload: data,
});
export function editSliderFunk(fd, id) {
  console.log(fd,id);
  return (dispatch) => {
    return axios 
      .put(`${API_BASE}/${id}`, fd)
      .then((result) =>{
        console.log(result.data)
        dispatch(editData(result.data)
        )}
        )
            // .then((res) => console.log(res))
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