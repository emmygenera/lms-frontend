import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingAnim({ animate = true, padding = "70px 0", animType = "grow", children }) {
  return (
    <div className="d-flex" style={{ display: "flex", padding, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
      {animate && <Spinner variant="#66b961" style={{ backgroundColor: "#66b961" }} animation={animType} size="lg" color="#66b961" />}
      <div className="col-12">{children}</div>
    </div>
  );
}
