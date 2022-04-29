import http from "./http";
import { Post } from "../applocal";

const Customer = {
  add: async (payload) => await Post({ url: "/users/add", data: payload, dataType: "json" }),
  getAll: async () => await http.get("/users/all"),
  getSingle: async (id) => await http.get(`/users/single/${id}`),
  getPaginated: async (page, pageSize, search) => await http.get(`/users/all?pageNo=${page}&pageSize=${pageSize}${search ? "&search=" + search : ""}`),
  deleteCustomer: async (id) => await http.delete(`/users/delete/${id}`),
  update: async (id, customer) => await Post({ url: `users/update/${id}`, data: customer, method: "patch" }),
};
// const Customer = {
//   add: async (payload) => await Post({ url: "/customers/add", data: payload, dataType: "formdata" }),
//   getAll: async () => await http.get("/customers/all"),
//   getSingle: async (id) => await http.get(`/customers/single/${id}`),
//   getPaginated: async (page, pageSize) => await http.get(`/customers/all?pageNo=${page}&pageSize=${pageSize}`),
//   deleteCustomer: async (id) => await http.delete(`/customers/delete/${id}`),
//   update: async (id, customer) => await Post({ url: `customers/update/${id}`, data: customer, dataType: "formdata", method: "patch" }),
// };

export default Customer;
