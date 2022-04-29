import http from "./http";

const orderService = {
  add: async (payload) => await http.post("/orders/add", payload),
  getAll: async () => await http.get("/orders/allOrders"),
  getSingle: async (id) => await http.get(`/orders/single/${id}`),
  getPaginated: async (page, pageSize) => await http.get(`/orders/allOrders?pageNo=${page}&pageSize=${pageSize}`),
  myOrders: async ({ id, page = 1, pageSize = 30 }) => await http.get(`/orders/myOrders/${id}?pageNo=${page}&pageSize=${pageSize}`),
  deleteorder: async (id) => await http.delete(`/orders/delete/${id}`),
  update: async (id, order) => await http.put(`/orders/${id}`, order),
};

export default orderService;
