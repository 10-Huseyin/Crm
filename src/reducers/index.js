import { combineReducers } from "redux";
import auth from "./auth.reducer";
import message from "./message.reducer";
import error from "./error.reducer";
import sidebar from "./sidebar.reducer";
import slider from "./slider.reducer";
import users from "./users.reducer";
import staticPages from "./staticPages.reducer";
import roles from "./roles.reducer";
import socialMedias from "./socialMedia.reducer";
import medias from "./media.reducer";
import experts from "./experts.reducer";
import iconBoxes from "./iconBox.reducer";
import messages from "./messages.reducer";
import sections from "./sections.reducer";
import subscribers from "./subscriber.reducer";
import products from "./products.reducer";
import pagination from "./pagination.reducer";
import companyIntro from "./company.reducer";
import companyProfile from "./companyProfile.reducer";
import menus from "./menus.reducer";
import blogs from "./blogs.reducer";
import comments from "./comments.reducer";
export default combineReducers({
  auth,
  message,
  error,
  sidebar,
  slider,
  users,
  experts,
  iconBoxes,
  messages,
  sections,
  subscribers,
  companyIntro,
  pagination,
  roles,
  staticPages,
  socialMedias,
  medias,
  companyProfile,
  products,
  menus,
  blogs,
  comments,
});