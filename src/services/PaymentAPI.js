import { Get, Post } from "../applocal";
import { PAYMENT_URL } from "./config.json";
import http from "./http";

export default {
  makePayment: (data) => Get({ url: PAYMENT_URL + "pay", data, dataType: "json" }),
};
