import { SET_USER, SET_LOGIN, SET_LOGOUT } from "../types";

export const setUser = (user) => (dispatch) => dispatch({ type: SET_USER, payload: user })


export const login = () => (dispatch) => dispatch({ type: SET_LOGIN });
export const logout = () => (dispatch) => dispatch({ type: SET_LOGOUT });
