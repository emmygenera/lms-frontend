import { SET_LOGIN, SET_LOGOUT, SET_USER } from './../types'

const initialState = {
  user: {},
  logedIn: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      // console.log(action.payload.token)
      // console.log(action.payload, 'accessToken:', action.payload.accessToken)

      localStorage.setItem('user_token', action.payload.accessToken)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.accessToken,
        logedIn: true,
      }
    }
    case SET_LOGIN: {
      return { ...state, logedIn: true }
    }
    case SET_LOGOUT: {
      return { ...state, logedIn: false, user: {} }
    }
    default:
      return state
  }
}
