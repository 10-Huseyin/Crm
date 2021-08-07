import {
  GET_STATICPAGES,
  GET_STATICPAGE,
  ADD_NEW_STATICPAGE,
  DELETE_STATICPAGE,
  EDIT_STATICPAGE,
  TOGGLE_VISIBLE
} from "./actionTypes";
import axios from "axios";
import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";


export const getData = (data) => ({
  type: GET_STATICPAGES,
  payload: data,
});
export function getStaticPages(limit, page) {
  //console.log(limit, page)
  return (dispatch) => {
    return axios.get(`${API_BASE}staticpage?limit=${limit}&page=${page}`)
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
  type: GET_STATICPAGE,
  payload: data,
});
export function getOneStaticPage(id) {
console.log("getonestaticPage")
  return (dispatch) => {
    return axios.get(`${API_BASE}staticpage/${id}`)
    .then((result) => {
      console.log(result);
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

export class UploadAdapter {
	constructor(mediaData) {
		this.mediaData = mediaData;
		this.upload();
	}
  
	// Starts the upload process.
	upload() {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_BASE}medias`, this.mediaData, {
					onUploadProgress: e => {
						console.log(
							// show upload process
							Math.round((e.loaded / e.total) * 100) + " %"
						);
					}
				})
				.then(response => {
					console.log(response.data.response.url)
					resolve({default:response.data.response.url});
				})
				.catch(error => {
					reject("Server Error");
					console.log("Server Error : ", error);
				});
		});
	}
}


export const postData = (data) => ({
  type: ADD_NEW_STATICPAGE,
  payload: data,
});

export function addNewStaticPage(state) {
  console.log("add new staticPage => ",state);
  return (dispatch) => {
    return axios
      .post(`${API_BASE}staticpage`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "StaticPage is added succesfully") : "StaticPage could not added!"
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
  type: DELETE_STATICPAGE,
  payload: data,
});
export function deleteStaticPage(id) {
  return (dispatch) => {
    return axios
      .delete(`${API_BASE}staticpage/${id}`, {})
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "StaticPage is deleted succesfully") : "StaticPage is not deleted!"
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
  type: EDIT_STATICPAGE,
  payload: data,
});
export function editStaticPageData(state, id) {
  console.log(state,id);
  return (dispatch) => {
    return axios
      .put(`${API_BASE}staticpage/${id}`, state)
      .then((response)=>{
        console.log(response)
        let msg = response.data.status === 200 ? (response.data.message || "StaticPage is updated succesfully") : "StaticPage could not updated!"
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

export function toggleVisible(id) {

  return (dispatch) => {
    dispatch({
        type:TOGGLE_VISIBLE,
        payload:axios.put(`${API_BASE}staticpage/${id}`,{})
        .then(res=>console.log(res))
    })
  }
}
