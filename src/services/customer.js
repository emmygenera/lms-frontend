import http from "./http";

const Customer = {
    add: async (payload) => await http.post("/customer/create", payload),
    getAll: async () => await http.get("/customer/all"),
    getSingle: async (id) => await http.get(`/customer/single/${id}`),
    getPaginated: async (page, pageSize) => await http.get(`/customer/all/paginated?page=${page}&pageSize=${pageSize}`),
    deleteCustomer: async (id) => await http.delete(`/customer/${id}`),
    update: async (id, customer) => await http.put(`/customer/${id}`, customer),
};

export default Customer;
