import { Get, Post } from "../applocal";

const NotifcationAPI = {
  userNotifications: (id) => Get({ url: "users/myNotifications/" + id }),
  adminNotifications: (id) => Get({ url: "users/adminNotifications/" + id }),
  closeNotifications: (id) => Post({ url: "/users/updateStatus/" + id, method: "patch" }),
  getNotifications: (id) => Get({ url: "/users/getNotifications/" + id }),
};

export default NotifcationAPI;
