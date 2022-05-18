import http from "./http";

const Marketing = {
  add: async ({ data: payload }) => await http.post("/marketing/add", payload),
  getAll: async () => await http.get("/marketing/all"),
  getPaginated: async (page, pageSize, query) => await http.get(`/marketing/all?pageNo=${page}&pageSize=${pageSize}&query=${query}`),
  getSingle: (id) => http.get(`marketing/single/${id}`),
  delete: async (id) => await http.delete(`/marketing/delete/${id}`),
  update: async ({ id, data: marketing }) => await http.patch(`/marketing/update/${id}`, marketing),
  updateStatus: async ({ id, data: marketing }) => await http.patch(`/marketing/statusUpdate/${id}`, marketing),
};

export default Marketing;
