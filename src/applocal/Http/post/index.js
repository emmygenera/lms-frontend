import Axios from "axios";
import { baseUrl, EmjsF } from "../..";
import { API_URL } from "../../../services/config.json";

import "../config";
// import React from 'react'

export default async function Post({ url = "", data = {}, dataType = "formdata", method = "post" }, create_custom_url = true) {
  const headers = {
    accept: "json",
    "Content-Type": dataType == "json" ? "application/json" : "multipart/form-data",
  };
  create_custom_url && Axios.create({ baseURL: API_URL });
  let formData = data;
  //   headers["Content-Type"] == "multipart/form-data"
  if (dataType == "formdata") {
    formData = new FormData();
    EmjsF(data).objList(({ key, value }) => {
      if (EmjsF(value).isArray()) {
        value.forEach((value) => {
          formData.append(key + "[]", value);
        });
      } else formData.append(key, value);
    });
  }

  return await Axios[method](url, formData, {
    responseType: "json",
    headers,
    method,
  });

  // .then((response) => {
  //     success(response);
  // })
  // .catch((errors) => {
  //     error(errors);
  //     // console.log(errors);
  //     // if (error.response.status = 401) {
  //     //     location.href = "/login";
  //     // }
  // });
}
