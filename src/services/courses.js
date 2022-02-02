import http from './http'

const Courses = {
  add: async (payload) => await http.post('/courses/add', payload),
  getAll: async () => await http.get('/courses/all'),
  getPaginated: async ({ page, pageSize, query, category, instructor, rating }) => {
    let q = `page=${page}&pageSize=${pageSize}`
    if (query) q = q + `&query=${query}`
    if (category) q = q + `&category=${category}`
    if (instructor) q = q + `&instructor=${instructor}`
    if (rating) q = q + `&rating=${rating}`
    // return await http.get(`/courses/all/paginated?${q}`)
    return await http.get(`/courses/all?${q}`)
  },
  deleteOne: async (id) => await http.delete(`/courses/delete/${id}`),
  updateOne: async (course) => await http.patch(`/courses/update/${course.id}`, course),
}

export default Courses
