import { Post } from "../applocal";
import http from "./http";

const TIpService = {
  add: ({ data }) => Post({ url: "/tips/add", data }),
  getAll: async () => await http.get("/tips/all"),
  getSingle: async (id) => await http.get(`/tips/single/${id}`),
  getPaginated: async ({ page, pageSize, query }) => await http.get(`/tips/all?pageNo=${page}&pageSize=${pageSize}&search=${query}`),
  deletetip: async (id) => await http.delete(`/tips/delete/${id}`),
  update: ({ id, data }) => Post({ url: `/tips/update/${id}`, data, method: "patch" }),
};

export default TIpService;
