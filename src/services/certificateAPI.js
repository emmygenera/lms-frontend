import http from "./http";
import { Post } from "../applocal";

const certificateAPI = {
  add: (payload) => Post({ url: "/users/uploadcertificate", data: payload }),
  getByUsers: async ({ id, pageNo, pageSize, search: query }) => await http.get(`/users/myCertificates/${id}?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}`),
  getPaginated: async (page, pageSize, query) => await http.get(`/users/myCertificates/620be20e40dc1d0016da81a2?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  // getPaginated: async (page, pageSize, query) => await http.get(`/users/certificates?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  delete: async (id) => await http.delete(`/roles/delete/${id}`),
  //   update: async (roles) => await Post({ url: `/roles/update/${roles.id}`, data: roles, dataType: "formdata", method: "patch" }),
};

export default certificateAPI;
