import http from "./http";
import { Post } from "../applocal";

const Staff = {
  add: (payload) => Post({ url: "/staff/add", data: payload }),
  getAll: async () => await http.get("/staff/all"),
  getOne: (id) => http.get("/staff/single/" + id),
  getPaginated: async (page, pageSize, query) => await http.get(`/staff/all?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  deleteStaff: async (id) => await http.delete(`/staff/delete/${id}`),
  updateOne: (staff) => Post({ url: `/staff/update/${staff.id}`, data: staff, method: "patch" }),
};

export default Staff;
