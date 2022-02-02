import http from "./http";

const Staff = {
    add: async (payload) => await http.post("/staff/create", payload),
    getAll: async () => await http.get("/staff/all"),
    getPaginated: async (page, pageSize, query) => await http.get(`/staff/all/paginated?page=${page}&pageSize=${pageSize}&query=${query}`),
    deleteStaff: async (id) => await http.delete(`/staff/${id}`),
    updateOne: async (staff) => await http.put(`/staff/${staff.id}`, staff),
};

export default Staff;
