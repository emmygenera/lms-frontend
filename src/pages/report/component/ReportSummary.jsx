import React from "react";

export default function ReportSummary({ value = "", label = "", color = "#2130B8" }) {
  return (
    <div className="d-flex">
      <div className="pr-2">
        <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="25" height="25" rx="12.5" fill={color} />
        </svg>
      </div>
      <div>
        <h3 className="m-0 fz-1 fw-bold">{value}%</h3>
        <p className="m-0 fz-sm">{label}</p>
      </div>
    </div>
  );
}
