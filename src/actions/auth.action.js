import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE
  } from "./actionTypes";
  
  
  const API_URL = "https://crmapp-server.herokuapp.com/";

  export const register = (data) => (dispatch) => {
    console.log(data)
    return axios.post(API_URL + "users", data)
    .then(
      (response) => {
        console.log("response ==>",response)
        dispatch({
          type: REGISTER_SUCCESS
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        setTimeout(() => {
          dispatch({
            type: CLEAR_MESSAGE,
          });
        }, 2000);
        return response.data.status;
      },
      (error) => {
        console.log("error ==>",error)
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
            console.log("mesaj ==>", message)
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        setTimeout(() => {
          dispatch({
            type: CLEAR_MESSAGE,
          });
        }, 2000);
        return Promise.reject();
      }
    );
  };
  
  export const login = (data) => (dispatch) => {
    console.log(data)
    return axios.post(API_URL + "users/login", data)
    .then(
      (response) => {
        console.log("response ==>",response)
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: response.data }
          });
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message || "sign-in succesfully",
          });
          setTimeout(() => {
            dispatch({
              type: CLEAR_MESSAGE,
            });
          }, 2000);
        } else {
          dispatch({
            type: LOGIN_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
          setTimeout(() => {
            dispatch({
              type: CLEAR_MESSAGE,
            });
          }, 2000);
        }
        return response.data.status;
      },
      (error) => {
        console.log("error ==>",error)
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
            console.log("mesaj ==>", message)
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        setTimeout(() => {
          dispatch({
            type: CLEAR_MESSAGE,
          });
        }, 2000);
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    localStorage.removeItem("user")
  
    dispatch({
      type: LOGOUT,
    });
  };