import { CLEAR_ADDONS_PURCHASE, SET_ADDONS_PURCHASE as ADDONS_PURCHASE, CLEAR_CART, SET_CART_ITEM, SET_PAYMENT_REQ, ClEAR_PAYMENT_REQ } from "../types";

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
export function clearPaymentData() {
  return (dispatch) =>
    dispatch({
      type: ClEAR_PAYMENT_REQ,
      payload: {},
    });
}

export const setAddonsPurchase = (data) => (dispatch) => dispatch({ type: ADDONS_PURCHASE, payload: data });
export const clearAddonsPurchase = () => (dispatch) => dispatch({ type: CLEAR_ADDONS_PURCHASE, payload: {} });

// export const setHeading = (title) => (dispatch) => dispatch({ type: SET_PAGE_TITLE, payload: title });
