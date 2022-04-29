import { Get, Post } from "../applocal";

const InvoiceAPI = {
  add: ({ data }) => Post({ url: "/invoice/add", data, dataType: "json" }),
  reciepts: () => Get({ url: "/invoice/reciepts" }),
  reports: () => Get({ url: "/invoice/reports" }),
  getAll: () => Get({ url: "/invoice/allInvoices" }),
  getSingle: (id) => Get({ url: `/invoice/single/${id}` }),
  getPaginated: (pageNo, pageSize) => Get({ url: "/invoice/allInvoices", data: { pageNo, pageSize } }),
  getMyInvoices: ({ id, pageNo, pageSize }) => Get({ url: "/invoice/myInvoices/" + id, data: { pageNo, pageSize } }),
  delete: (id) => Post({ url: `/invoice/delete/${id}`, method: "delete" }),
  refund: ({ id, data }) => Post({ url: `/invoice/refund/${id}`, method: "patch", data, dataType: "json" }),
  update: ({ id, data }) => Post({ url: `/invoice/update/${id}`, data, method: "patch", dataType: "json" }),
};

export default InvoiceAPI;
