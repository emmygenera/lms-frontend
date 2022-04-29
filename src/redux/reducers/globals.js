import { CLEAR_CART, SET_CART_ITEM, SET_PATH, SET_PAYMENT_REQ } from "../types";

const initialState = {
  paths: [],
  carts: {},
  payment: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PATH: {
      return { ...state, paths: action.payload };
    }
    case SET_CART_ITEM: {
      return { ...state, carts: { ...state.carts, ...action.payload } };
    }
    case CLEAR_CART: {
      return { ...state, carts: {} };
    }
    case SET_PAYMENT_REQ: {
      return { ...state, payment: { ...action.payload } };
    }
    default:
      return state;
  }
}
