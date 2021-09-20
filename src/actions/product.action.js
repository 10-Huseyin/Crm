import {
    GET_PRODUCTS,
    GET_ALL_PRODUCTS,
    GET_PRODUCT,
    ADD_NEW_PRODUCT,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    TOGGLE_VISIBLE
  } from "./actionTypes";
  import axios from "axios";
  import { setMessage, setError, setPagination } from "./message.action";
import { API_BASE } from "./api_base";
    
  export const getData = (data) => ({
    type: GET_PRODUCTS,
    payload: data,
  });
  export function getProducts(limit, page,filteredValue) {

    console.log(limit, page, filteredValue)
    return (dispatch) => {
      return axios.post(`${API_BASE}products/filter?limit=${limit}&page=${page}`, {query:filteredValue})
      .then((result) => {
        console.log(result);
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

  // export const getQueryData = (data) => ({
  //   type: GET_PRODUCTS,
  //   payload: data,
  // });
  // export function getQueryProducts(queryObject) {
  //   //console.log(limit, page)
  //   return (dispatch) => {
  //     return axios.post(`${API_BASE}products/filter`,queryObject)
  //     .then((result) => {
  //       console.log("RESULT  "+result);
  //       dispatch(setPagination({page:result.data.pages, total:result.data.total}));
  //       dispatch(getQueryData(result.data.response))
  //       return result.data.status;
  //     },
  //     (error)=> {
  //       setError(error, dispatch)
  //     return error
  //   })
  //     .catch((error) => error);
  //   };
  // }

  // export const getAllData = (data) => ({
  //   type: GET_ALL_PRODUCTS,
  //   payload: data,
  // });

  export function getAllProducts(limit, page) {
    console.log(limit, page)
    return (dispatch) => {
      return axios.get(`${API_BASE}products?limit=${limit}&page=${page}`)
      .then((result) => {
        console.log(result);
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
    type: GET_PRODUCT,
    payload: data,
  });
  export function getOneProduct(id) {
    return (dispatch) => {
      return axios.get(`${API_BASE}products/${id}`)
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
    type: ADD_NEW_PRODUCT,
    payload: data,
  });

  export function addNewProduct(state) {
    console.log("add new product => ",state);
    return (dispatch) => {
      return axios
        .post(`${API_BASE}products`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Product is added succesfully") : "Product could not added!"
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
    type: DELETE_PRODUCT,
    payload: data,
  });
  export function deleteProduct(id) {
    return (dispatch) => {
      return axios
        .delete(`${API_BASE}products/${id}`, {})
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Product is deleted succesfully") : "Product is not deleted!"
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
    type: EDIT_PRODUCT,
    payload: data,
  });
  export function editProductData(state, id) {
    console.log(state,id);
    return (dispatch) => {
      return axios
        .put(`${API_BASE}products/${id}`, state)
        .then((response)=>{
          console.log(response)
          let msg = response.data.status === 200 ? (response.data.message || "Product is updated succesfully") : "Product could not updated!"
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
          payload:axios.put(`${API_BASE}products/${id}`,{})
          .then(res=>console.log(res))
      })
    }
  }