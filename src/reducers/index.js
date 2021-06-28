import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import error from "./error";
import sidebar from "./sidebar";
import slider from "./slider";
import users from "./users";
import experts from "./experts";


export default combineReducers({
  auth,
  message,
  error,
  sidebar,
  slider,
  users,
  experts,
});