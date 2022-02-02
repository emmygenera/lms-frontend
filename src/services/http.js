import Axios from 'axios'
import { toast } from 'react-toastify'
// const { API_URL } = process.env;

import { API_URL } from './config.json'

Axios.defaults.baseURL = API_URL

const token = localStorage.getItem('user_token')
// console.log({ token })
if (token) {
  Axios.defaults.headers.common['x-auth-token'] = token
}
// Axios.create({
//   headers: { Authorization: `Bearer ${token}` },
// })
Axios.interceptors.request.use(function (config) {
  // const token = store.getState().session.token;
  config.headers['x-auth-token'] = token
  config.headers['Authorization'] = `Bearer ${token}`
  return config
})

Axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500

  if (!expectedError) toast.error('An unexpected error occured.')
  if (error && error.response.data && !error.response.data.succes) toast.info(error.response.data.error)

  return Promise.reject(error)
})

export default Axios
