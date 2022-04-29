import { Get, Post } from "../applocal";

const Question = {
  add: (payload) => Post({ url: "/question/add", data: payload, dataType: "json" }),
  addReply: (id, data) => Post({ url: "/question/replyQuestion/" + id, data, dataType: "json", method: "put" }),
  closeQuestion: (id, data) => Post({ url: "/question/closeQuestion/" + id, data, dataType: "json", method: "put" }),
  getAll: () => Get({ url: "/question/all" }),
  getSingle: (id) => Get({ url: `/question/single/${id}` }),
  getPaginated: (pageNo, pageSize) => Get({ url: "/question/all", data: { pageNo, pageSize } }),
  getMyQuestion: ({ id, pageNo, pageSize }) => Get({ url: "/question/myQuestions/" + id, data: { pageNo, pageSize } }),
  getInstructorQuestion: ({ id, pageNo, pageSize }) => Get({ url: "/question/instQuestions/" + id, data: { pageNo, pageSize } }),
  delete: (id) => Post({ url: `/question/delete/${id}`, method: "delete" }),
  update: (id, tip) => Post({ url: `/question/update/${id}`, data: tip, method: "patch" }),
};

export default Question;
