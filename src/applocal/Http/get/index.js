import Axios from "axios";
// import { baseUrl } from "../..";
import { API_URL } from "../../../services/config.json";
// import React from 'react'
import "../config";

export default function Get({ url = "", data = {}, /*success, error,*/ method }, create_url = true) {
  create_url && Axios.create({ baseURL: API_URL });
  // const url = new URL(`your_url.com`);
  // url.search = new URLSearchParams(obj);
  let urlSearch = new URLSearchParams(data).toString();
  urlSearch = (urlSearch !== "" ? "?" : "") + urlSearch;
  return Axios.get(url + urlSearch, {
    responseType: "json",
    method,
  });
  // .then((response) => {
  //   success(response);
  // })
  // .catch((errors) => {
  //   error(errors);
  // });
}
