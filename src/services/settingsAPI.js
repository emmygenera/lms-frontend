import http from "./http";
import { Post } from "../applocal";

const settingsAPI = {
  add: (payload) => Post({ url: "/users/addSetting", data: payload }),
  addWelcomeMessage: (payload) => Post({ url: "/users/pageSetting", data: payload }),
  get: async () => await http.get("/users/getSettings"),
  getWelcomeMessage: async () => await http.get("/users/getPageSettings"),
  //   getPaginated: async (page, pageSize, query) => await http.get(`/roles/all?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  //   delete: async (id) => await http.delete(`/roles/delete/${id}`),
  //   update: async (roles) => await Post({ url: `/roles/update/${roles.id}`, data: roles, dataType: "formdata", method: "patch" }),
};

export default settingsAPI;
