import { SET_CATEGORIES, SET_COURSES, SET_INSTRUCTORS, SET_NOTIFCATION, SET_ORDERS, SET_SEARCH_STRING } from "../types";

const initialState = {
  categories: [],
  instructors: [],
  courses: [],
  orders: [],
  search: "",
  notifications: {
    courseNotifcations: [],
    messageNotifications: [],
    ticketNotifications: [],
    questionNotifications: [],
    orderNotifications: [], //
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CATEGORIES: {
      return { ...state, categories: payload };
    }
    case SET_INSTRUCTORS: {
      return { ...state, instructors: payload };
    }
    case SET_COURSES: {
      return { ...state, courses: payload };
    }
    case SET_ORDERS: {
      return { ...state, orders: payload };
    }
    case SET_SEARCH_STRING: {
      return { ...state, search: payload };
    }
    case SET_NOTIFCATION: {
      return { ...state, notifications: payload };
    }
    default:
      return state;
  }
}
