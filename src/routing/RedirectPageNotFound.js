import React from "react";
import { Redirect } from "react-router-dom";

export default function RedirectPageNotFound() {
  return <Redirect from="*" to="/404" />;
  return <div>RedirectPageNotFound</div>;
}
