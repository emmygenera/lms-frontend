import http from "./http";
import { Post } from "../applocal";

const reportAPI = {
  //   add: async (payload) => await Post({ url: "/roles/add", data: payload, dataType: "formdata" }),
  getAll: async () => await http.get("/invoice/report"),
  //   getPaginated: async (page, pageSize, query) => await http.get(`/roles/all?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  //   delete: async (id) => await http.delete(`/roles/delete/${id}`),
  //   update: async (roles) => await Post({ url: `/roles/update/${roles.id}`, data: roles, dataType: "formdata", method: "patch" }),
};

export default reportAPI;
