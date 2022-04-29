import http from "./http";

const lesson = {
  add: async (payload) => await http.post("/lessions/add", payload),
  getAll: async () => await http.get("/lessions/all"),
  getLessonByCourse: async (id) => await http.get("lessions/lessions/" + id),
  getLessonByCourseAndUser: async (id, userid) => await http.get(`lessions/lessions/${id}?userId=${userid}`),
  getSingle: async (id) => await http.get(`/lessions/single/${id}`),
  getMarkComplete: async (data) => await http.post(`/lessions/markCompleted`, data),
  getPaginated: async (page, pageSize) => await http.get(`/lessions/all?pageNo=${page}&pageSize=${pageSize}`),
  deletelesson: async (id) => await http.delete(`/lessions/delete/${id}`),
  update: async (id, lesson) => await http.patch(`/lessions/update/${id}`, lesson),
};

export default lesson;
