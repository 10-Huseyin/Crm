import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_ALL_PRODUCTS,
  ADD_NEW_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  TOGGLE_VISIBLE,
} from "../actions/actionTypes";

const initialState = {
  allProductList: [],
  productList: [],
  product:{},
  
};

export default (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, productList: action.payload };
      case GET_ALL_PRODUCTS:
        return { ...state, allProductList: action.payload };
    case GET_PRODUCT:
      return { ...state, product: action.payload };
    case ADD_NEW_PRODUCT:
      return { ...state, productList: [...state.productList, action.payload] };
    case DELETE_PRODUCT:
      return { ...state, productList: state.productList.filter((item)=>item._id !== action.payload.data._id) };
    case EDIT_PRODUCT:
      return { ...state, productList: [...state.productList, action.payload] };
    case TOGGLE_VISIBLE:
      return { ...state };
    default:
      return state;
  }
};
