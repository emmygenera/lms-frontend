import { Get, Post } from "../applocal";

const message = {
  add: (payload) => Post({ url: "/message/add", data: payload, dataType: "json" }),
  replyMessage: (id, data) => Post({ url: "/message/replymessage/" + id, data, dataType: "json", method: "put" }),
  closeMessage: (id, data) => Post({ url: "/message/closemessage/" + id, data, dataType: "json", method: "put" }),
  getAll: () => Get({ url: "/message/all" }),
  getSingle: (id) => Get({ url: `/message/single/${id}` }),
  getPaginated: (pageNo, pageSize) => Get({ url: "/message/all", data: { pageNo, pageSize } }),
  getMyMessage: ({ id, pageNo, pageSize }) => Get({ url: "/message/mymessages/" + id, data: { pageNo, pageSize } }),
  getInstructorMessage: ({ id, pageNo, pageSize }) => Get({ url: "/message/all?instId=" + id, data: { pageNo, pageSize } }),
  delete: (id) => Post({ url: `/message/delete/${id}`, method: "delete" }),
  //   update: (id, tip) => Post({ url: `/message/update/${id}`, data: tip, method: "patch" }),
};

export default message;
