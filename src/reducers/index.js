import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";
import error from "./error.reducer";
import sidebar from "./sidebar.reducer";
import slider from "./slider.reducer";
import users from "./users.reducer";
import experts from "./experts.reducer";
import companyIntro from "./company.reducer";

export default combineReducers({
  auth,
  message,
  error,
  sidebar,
  slider,
  users,
  experts,
  companyIntro,

});