import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";
import error from "./error.reducer";
import sidebar from "./sidebar.reducer";
import slider from "./slider.reducer";
import users from "./users.reducer";
import roles from "./roles.reducer";
import socialMedias from "./socialMedia.reducer";
import medias from "./media.reducer";
import experts from "./experts.reducer";
import products from "./products.reducer";
import pagination from "./pagination.reducer";
import companyIntro from "./company.reducer";
import companyProfile from "./companyProfile.reducer";
import menus from "./menus.reducer";
export default combineReducers({
  auth,
  message,
  error,
  sidebar,
  slider,
  users,
  experts,
  companyIntro,
  pagination,
  roles,
  socialMedias,
  medias,
  companyProfile,
  products,
  menus,
});