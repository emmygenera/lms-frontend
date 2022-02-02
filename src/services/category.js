import http from './http'

const Category = {
  add: async (payload) => await http.post('/categories/add', payload),
  getAll: async () => {
    const data = await http.get('/categories/all')
    return data
  },
  getOne: async () => {
    const data = await http.get('/categories/single')
    return data
  },
  getPaginated: async (page, pageSize) => await http.get(`/categories/all?page=${page}&pageSize=${pageSize}`),
  deleteCategory: async (id) => await http.delete(`/categories/delete/${id}`),
  updateOne: async (category) => await http.patch(`/categories/update/${category.id}`, category),
}

export default Category
