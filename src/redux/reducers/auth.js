import { CLEAR_CUSTOMER, SET_CUSTOMER, SET_LOGIN, SET_LOGOUT, SET_USER } from "./../types";

const initialState = {
  user: {},
  logedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      // console.log(action.payload);
      // console.log(action.payload?.data);
      // console.log(action.payload, 'accessToken:', action.payload.accessToken)

      localStorage.setItem("user_token", action.payload.accessToken);
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.accessToken,
        userRl: action.payload?.data?.role?.roleName,
        userRlId: action.payload?.data?.role?._id,
        logedIn: true,
      };
    }
    case SET_LOGIN: {
      return { ...state, logedIn: true };
    }
    case SET_CUSTOMER: {
      return { ...state, customer: action.payload };
    }
    case CLEAR_CUSTOMER: {
      return { ...state, customer: action.payload };
    }
    case SET_LOGOUT: {
      return { ...state, logedIn: false, user: {} };
    }
    default:
      return state;
  }
}
