import http from "./http";

const User = {
  login: async (email, password) => {
    return await http.post("users/login", { email, password });
  },
  getAll: () => http.get("users/all"),
  getPaginated: async (page, pageSize) => await http.get(`/users/all?pageNo=${page}&pageSize=${pageSize}`),
};

export default User;
