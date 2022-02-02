import http from './http'

const Instructor = {
  add: async (payload) => await http.post('/instructors/add', payload),
  getAll: async () => await http.get('/instructors/all'),
  getPaginated: async (page, pageSize, query) => await http.get(`/instructors/all?page=${page}&pageSize=${pageSize}&query=${query}`),
  // getPaginated: async (page, pageSize, query) => await http.get(`/instructors/all/paginated?page=${page}&pageSize=${pageSize}&query=${query}`),
  deleteinstructor: async (id) => await http.delete(`/instructors/delete/${id}`),
  updateOne: async (instructor, insid) => await http.patch(`/instructors/update/${insid}`, instructor),
}

export default Instructor
