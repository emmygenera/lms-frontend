import Axios from "axios";

const token = localStorage.getItem("user_token");
// console.log({ token })
if (token) {
  Axios.defaults.headers.common["x-auth-token"] = token;
}
// Axios.create({
//   headers: { Authorization: `Bearer ${token}` },
// })
Axios.interceptors.request.use(function (config) {
  // const token = store.getState().session.token;
  config.headers["x-auth-token"] = token;
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
