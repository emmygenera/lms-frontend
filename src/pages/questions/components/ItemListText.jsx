import React from "react";

export function ItemListText({ title = "", value = "", _data = [] }) {
  return (
    <div className="d-flex align-items-center" style={{ marginLeft: "0px" }}>
      <span className="px-2 fw-bold ">{title}</span>
      <p className="p-2 m-0" style={{ border: 0, borderRadius: 30, backgroundColor: "#efebeb" }}>
        {value}
      </p>
    </div>
  );
}
