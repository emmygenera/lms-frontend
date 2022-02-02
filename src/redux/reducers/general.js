import { SET_CATEGORIES, SET_COURSES, SET_INSTRUCTORS, SET_ORDERS } from '../types';

const initialState = {
  categories: [],
  instructors: [],
  courses: [],
  orders: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CATEGORIES: {
      return { ...state, categories: payload }
    }
    case SET_INSTRUCTORS: {
      return { ...state, instructors: payload }
    }
    case SET_COURSES: {
      return { ...state, courses: payload }
    }
    case SET_ORDERS: {
      return { ...state, orders: payload }
    }
    default: return state;
  }

}