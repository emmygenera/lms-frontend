import http from './http'

const User = {
  login: async (email, password) => {
    return await http.post('users/login', { email, password })
  },
}

export default User
