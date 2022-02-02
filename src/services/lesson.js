import http from "./http";

const lesson = {
    add: async (payload) => await http.post("/lesson/create", payload),
    getAll: async () => await http.get("/lesson/all"),
    getSingle: async (id) => await http.get(`/lesson/single/${id}`),
    getPaginated: async (page, pageSize) => await http.get(`/lesson/all/paginated?page=${page}&pageSize=${pageSize}`),
    deletelesson: async (id) => await http.delete(`/lesson/${id}`),
    update: async (id, lesson) => await http.put(`/lesson/${id}`, lesson),
};

export default lesson;
