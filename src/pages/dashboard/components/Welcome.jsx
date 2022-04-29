import React, { useState } from "react";

import { baseUrl, Cookie, jsonValue, setImageIfError } from "../../../applocal";
import { BASE_URL } from "../../../services/config.json";
import LoadingAnim from "../../../components/LoadingAnim";

const COOKIENAME = "welcome_message";
export default function Welcome({ data = {}, loading }) {
  const [remindMe, setRemindMe] = useState(Cookie(COOKIENAME).has());
  const [img_path, setImage_path] = useState("");
  const imgPath = BASE_URL + jsonValue(data?.image, {}).get(0)?.url;

  const onRemindMe = (e) => {
    e.preventDefault();
    setRemindMe(true);
    Cookie(COOKIENAME).set(true, 0.1);
  };
  setImageIfError(
    imgPath,
    function () {
      setImage_path(baseUrl("logo.png"));
    },
    () => {
      setImage_path(imgPath);
    }
  );
  // console.log(data);

  return (
    !remindMe && (
      <div className="bg-silver p-3 rad_5 row mb-4">
        {loading ? (
          <div className="col-12">
            <LoadingAnim />
          </div>
        ) : (
          <>
            <div className="col-sm-8">
              <h3 style={{ color: "#2b9035" }} className="fz-2 font-weight-bold">
                {/* Welcome to EzeeTrader! */}
                {data?.title}
              </h3>
              <p>
                {data?.description}
                {/* Copyright (C) Microsoft Corporation. All rights reserved. Try the new cross-platform PowerShell Copyright (C) Microsoft Corporation. All rights reserved. Try the new cross-platform PowerShell Copyright (C) Microsoft Corporation. All rights reserved. Try the new cross-platform PowerShell */}
              </p>
              <div>
                <a href={data?.url && "javascript:void(0)"} className="btn btn-danger rad_5 .p-3 mr-3">
                  Learn More &nbsp;&nbsp;&rarr;
                </a>
                <a href="javascript:void(0)" onClick={onRemindMe} className="p-2" style={{ textDecoration: "underline", color: "#2b9035" }}>
                  Remind me later
                </a>
              </div>
            </div>
            <div className="col-sm-4">
              <img src={img_path} className="w-100 p-relative" style={{ bottom: 25 }} />
            </div>
          </>
        )}
      </div>
    )
  );
}
