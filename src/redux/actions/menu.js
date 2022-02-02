import { SET_PAGE_TITLE } from "../types";

export const setHeading = (title) => (dispatch) => dispatch({ type: SET_PAGE_TITLE, payload: title });
