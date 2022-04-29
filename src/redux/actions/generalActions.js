import { SET_CATEGORIES, SET_COURSES, SET_INSTRUCTORS, SET_NOTIFCATION, SET_ORDERS, SET_SEARCH_STRING } from "../types";

export const setCategories = (categories) => (dispatch) => dispatch({ type: SET_CATEGORIES, payload: categories });

export const setInstructors = (data) => (dispatch) => dispatch({ type: SET_INSTRUCTORS, payload: data });

export const setCourses = (data) => (dispatch) => dispatch({ type: SET_COURSES, payload: data });

export const setOrders = (data) => (dispatch) => dispatch({ type: SET_ORDERS, payload: data });

export const setSearchString = (data) => (dispatch) => dispatch({ type: SET_SEARCH_STRING, payload: data });

export const setNotification = (data) => (dispatch) => dispatch({ type: SET_NOTIFCATION, payload: data });
