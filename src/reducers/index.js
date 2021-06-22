import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import sidebar from "./sidebar";
import slider from "./slider";
import users from "./users";
import experts from "./experts";


export default combineReducers({
  auth,
  message,
  sidebar,
  slider,
  users,
  experts,
});