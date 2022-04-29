import { Post } from "../applocal";
import http from "./http";

const Lead = {
  add: async ({ data: payload }) => await http.post("/leads/add", payload),
  importCSV: ({ data }) => Post({ url: "/leads/upload-csv-file", data }),
  getAll: async () => await http.get("/leads/all"),
  getPaginated: async (page, pageSize, query) => await http.get(`/leads/all?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  getSingle: (id) => http.get(`leads/single/${id}`),
  delete: async (id) => await http.delete(`/leads/delete/${id}`),
  update: async ({ id, data: lead }) => await http.patch(`/leads/update/${id}`, lead),
  updateStatus: async (id) => await http.put(`/leads/updateStatus/${id}`),
};

export default Lead;
