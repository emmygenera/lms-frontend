import http from "./http";

const Lead = {
    add: async (payload) => await http.post("/lead/create", payload),
    getAll: async () => await http.get("/lead/all"),
    getPaginated: async (page, pageSize, query) => await http.get(`/lead/all/paginated?page=${page}&pageSize=${pageSize}&query=${query}`),
    deleteinstructor: async (id) => await http.delete(`/lead/${id}`),
    updateOne: async (lead) => await http.put(`/lead/${lead.id}`, lead),
};

export default Lead;
