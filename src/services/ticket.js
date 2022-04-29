import { Get, Post, toURLString } from "../applocal";

const Ticket = {
  add: (payload) => Post({ url: "/tickets/add", data: payload, dataType: "json" }),
  replyTicket: (id, payload) => Post({ url: "/tickets/replyToTicket/" + id, data: payload, dataType: "json", method: "put" }),
  closeTicket: (id, payload) => Post({ url: "/tickets/closeTicket/" + id, data: payload, dataType: "json", method: "put" }),
  getAll: () => Get({ url: "/tickets/all" }),
  getSingle: (id) => Get({ url: `/tickets/single/${id}` }),
  getPaginated: (pageNo, pageSize) => Get({ url: "/tickets/all", data: { pageNo, pageSize } }),
  getMyTickets: ({ id, pageNo, pageSize }) => Get({ url: "/tickets/myTickets/" + id, data: { pageNo, pageSize } }),
  delete: (id) => Post({ url: `/tickets/delete/${id}`, method: "delete" }),
  assignToStaff: ({ staffId, ticketId, data = {} }) =>
    Post({
      url: `/tickets/assignTicket?${toURLString({ staffId, ticketId })}`,
      data: data,
      method: "put",
      dataType: "json",
    }),
  update: (id, tip) => Post({ url: `/tickets/update/${id}`, data: tip, method: "patch" }),
};

export default Ticket;
