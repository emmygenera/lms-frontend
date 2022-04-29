import { SET_USER, SET_LOGIN, SET_CUSTOMER, SET_LOGOUT, CLEAR_CUSTOMER } from "../types";

export const setUser = (user) => (dispatch) => dispatch({ type: SET_USER, payload: user });
export const setCustomer = (user) => (dispatch) => dispatch({ type: SET_CUSTOMER, payload: user });
export const clearCustomer = () => (dispatch) => dispatch({ type: CLEAR_CUSTOMER, payload: {} });

export const login = () => (dispatch) => dispatch({ type: SET_LOGIN });
export const logout = () => (dispatch) => dispatch({ type: SET_LOGOUT });
