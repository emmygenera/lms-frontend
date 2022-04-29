import React from "react";
import { Link } from "react-router-dom";
import FontAwesomeArrowDown from "./FontAwesomeArrowDown";

export default function LinkDown({ onClick, href }) {
  return (
    <div className="d-flex justify-content-center w-100">
      <Link className="btn p-2 rad_all px-3 shadow" to={href} onClick={onClick}>
        <FontAwesomeArrowDown size={10} />
      </Link>
    </div>
  );
}
