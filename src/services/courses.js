import { Get } from "../applocal";
import http from "./http";

const Courses = {
  add: async (payload) => await http.post("/courses/add", payload),
  getAll: async () => await http.get("/courses/all?pageSize=20"),
  getActive: ({ data, page: pageNo = 1, pageSize = 50, ...otherProps }) => Get({ url: "/courses/active", data: { ...data, pageNo, pageSize, ...otherProps } }),
  getSingle: async (id) => await http.get("/courses/single/" + id),
  getPaginated: ({ pageNo, pageSize, data }) => {
    // getPaginated: async ({ page, pageSize, query, category, instructor, rating }) => {
    // let q = `?pageNo=${page}&pageSize=${pageSize}`;
    // if (query) q = q + `&query=${query}`;
    // if (category) q = q + `&cateId=${category}`;
    // if (instructor) q = q + `&instId=${instructor}`;
    // if (rating) q = q + `&rating=${rating}`;
    // return await http.get(`/courses/all/paginated?${q}`)
    return Get({ url: `/courses/all`, data: { pageSize, pageNo, ...data } });
  },
  getSearchResults: async ({ page = 1, pageSize = 50, query, data }) => {
    let q = `&pageNo=${page}&pageSize=${pageSize}&search=${query}`;
    // return await http.get(`/courses/all/paginated?${q}`)
    // return await http.get(`users/search?searchFor=1${q}`);
    return Get({ url: `users/search`, data: { searchFor: 1, pageNo: page, pageSize, search: query, ...data } });
  },
  deleteOne: async (id) => await http.delete(`/courses/delete/${id}`),
  updateOne: async (course, id) => await http.patch(`/courses/update/${id}`, course),
};

export default Courses;
