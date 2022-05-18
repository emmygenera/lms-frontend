import http from "./http";
import { Get, Post } from "../applocal";

const addonsAPI = {
  add: (payload) => Post({ url: "/addons/add", data: payload, dataType: "json" }),
  update: ({ id, data: payload }) => Post({ url: "/addons/update/" + id, data: payload, method: "patch", dataType: "json" }),
  getSingle: async (id) => await http.get(`/addons/single/${id}`),
  getAll: async (page, pageSize, query) => await http.get(`/addons/all`),
  getPaginated: async (page, pageSize, query) => await http.get(`/addons/getPaginated?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  delete: async (id) => await http.delete(`/addons/delete/${id}`),
  // addons purchases
  getAddonPurchases: async ({ pageNo, pageSize }) => await http.get(`/addons/purchases`),
  userPurchaseOrNot: (id, payload) => Get({ url: "/addons/purchase/" + id, data: payload }),
  purchaseAdd: (payload) => Post({ url: "/addons/purchase/add", data: payload, dataType: "json" }),
  purchaseUpdate: ({ id, data: payload }) => Post({ url: "/addons/purchase/update/" + id, data: payload, dataType: "json", method: "patch" }),
  purchaseDelete: ({ id, data: payload }) => Post({ url: "/addons/purchase/delete/" + id, data: payload, dataType: "json", method: "delete" }),
  purchaseGetSingle: ({ id, data: payload }) => Get({ url: "/addons/purchase/get/" + id, data: payload }),
};

export default addonsAPI;
