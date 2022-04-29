import { CLEAR_CART, SET_CART_ITEM, SET_PAYMENT_REQ } from "../types";

export function setPayment(data = {}) {
  return (dispatch) =>
    dispatch({
      type: SET_PAYMENT_REQ,
      payload: data,
    });
}
export function setCartItem(data = {}) {
  return (dispatch) =>
    dispatch({
      type: SET_CART_ITEM,
      payload: data,
    });
}
export function clearCartItem(data = {}) {
  return (dispatch) =>
    dispatch({
      type: CLEAR_CART,
      payload: data,
    });
}
// export const setHeading = (title) => (dispatch) => dispatch({ type: SET_PAGE_TITLE, payload: title });
