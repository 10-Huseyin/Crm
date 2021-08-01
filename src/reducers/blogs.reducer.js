import {
  GET_BLOGS,
  GET_BLOG,
  ADD_NEW_BLOG,
  DELETE_BLOG,
  EDIT_BLOG,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  blogList: [],
  blog:{}
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_BLOGS:
      return { ...state, blogList: action.payload };
    case GET_BLOG:
      return { ...state, blog: action.payload };
    case ADD_NEW_BLOG:
      return { ...state, blogList: [...state.blogList, action.payload] };
    case DELETE_BLOG:
      return { ...state, blogList: state.blogList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_BLOG:
      return { ...state, blogList: [...state.blogList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
