import http from "./http";

const orderService = {
  add: async (payload) => await http.post("/order/create", payload),
  getAll: async () => await http.get("/order/all"),
  getSingle: async (id) => await http.get(`/order/single/${id}`),
  getPaginated: async (page, pageSize) => await http.get(`/order/all/paginated?page=${page}&pageSize=${pageSize}`),
  deleteorder: async (id) => await http.delete(`/order/${id}`),
  update: async (id, order) => await http.put(`/order/${id}`, order),
};

export default orderService;
