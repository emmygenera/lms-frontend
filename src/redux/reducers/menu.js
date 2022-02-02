import { RESET, SET_PAGE_TITLE, SET_PLOT, SET_POINT, SET_POLYGON } from "../types";
const initialState = {
    heading: "Login",
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PAGE_TITLE:
            return { ...state, heading: action.payload };
        default:
            return state;
    }
}
