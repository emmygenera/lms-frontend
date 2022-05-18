import { CLEAR_ADDONS_PURCHASE, CLEAR_CART, ClEAR_PAYMENT_REQ, SET_ADDONS_PURCHASE, SET_CART_ITEM, SET_PATH, SET_PAYMENT_REQ } from "../types";

const initialState = {
  paths: [],
  carts: {},
  addons_purchase: {},
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
    case SET_ADDONS_PURCHASE: {
      return { ...state, addons_purchase: { ...state.addons_purchase, ...action.payload } };
    }
    case CLEAR_ADDONS_PURCHASE: {
      return { ...state, addons_purchase: {} };
    }
    case CLEAR_CART: {
      return { ...state, carts: {} };
    }
    case SET_PAYMENT_REQ: {
      return { ...state, payment: { ...action.payload } };
    }
    case ClEAR_PAYMENT_REQ: {
      return { ...state, payment: {} };
    }
    default:
      return state;
  }
}
