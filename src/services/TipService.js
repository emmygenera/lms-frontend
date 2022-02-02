import http from "./http";

const TIpService = {
  add: async (payload) => await http.post("/tip/create", payload),
  getAll: async () => await http.get("/tip/all"),
  getSingle: async (id) => await http.get(`/tip/single/${id}`),
  getPaginated: async (page, pageSize) => await http.get(`/tip/all/paginated?page=${page}&pageSize=${pageSize}`),
  deletetip: async (id) => await http.delete(`/tip/${id}`),
  update: async (id, tip) => await http.put(`/tip/${id}`, tip),
};

export default TIpService;
