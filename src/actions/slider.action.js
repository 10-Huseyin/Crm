import {
  GET_SLIDERS,
  GET_SLIDER,
  ADD_NEW_SLIDER,
  DELETE_SLIDER,
  EDIT_SLIDER,
  TOGGLE_VISIBLE,
  } from "./actionTypes";
import { setMessage, setError ,setPagination} from "./message.action";
import axios from "axios";
import { API_BASE } from "./api_base";


export const getData = (data) => ({
  type: GET_SLIDERS,
  payload: data,
});

export function getSliders(limit, page) {
 
  return (dispatch) => {
    return axios.get(`${API_BASE}slider?limit=${limit}&page=${page}`)
    .then((result) => {
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
  type: GET_SLIDER,
  payload: data,
});
export function getOneSlider(id) {
  return (dispatch) => {
    return axios.get(`${API_BASE}slider/${id}`)
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
  type: ADD_NEW_SLIDER,
  payload: data,
});
export function addNewSlider(state) {

  return (dispatch) => {
    return axios
      .post(`${API_BASE}slider`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Slider added succesfully") : "Slider could not added!"
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
  type: DELETE_SLIDER,
  payload: data,
});
export function deleteSlider(id) {
  return (dispatch) => {
    return axios
      .delete(`${API_BASE}slider/${id}`, {})
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Slider deleted succesfully") : "Slider is not deleted!"
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
  type: EDIT_SLIDER,
  payload: data,
});
export function editSliderFunk(fd, id) {
  console.log(fd,id);
  return (dispatch) => {
    return axios
      .put(`${API_BASE}slider/${id}`, fd)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "Slider is updated succesfully") : "Slider could not updated!"
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
        payload:axios.put(`${API_BASE}slider/${id}`,{})
        .then(res=>console.log(res))
    })
  }
}