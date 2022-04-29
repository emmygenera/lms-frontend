import React from "react";

import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

export default function List({ title = "", onClick, link, subject = "", status = "Open", mode = "success" }) {
  return (
    <div className="row">
      <div className="col-8 p-0">
        {title && (
          <h4 className="fz-sm m-0" style={{ fontWeight: 600 }}>
            {link ? (
              <Link to={link} onClick={onClick} className={`py-1 text-default text-dark  d-inline-block`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h4>
        )}
        {subject && (
          <Paragraph ellipsis={{ rows: 2, symbol: " " }} className="fz-sm">
            {link ? (
              <Link to={link} onClick={onClick} className={`py-1 text-default text-dark d-inline-block`}>
                {subject}
              </Link>
            ) : (
              subject
            )}
          </Paragraph>
        )}
      </div>
      <div className="col-4 p-0 text-right">
        {link ? (
          <Link to={link} onClick={onClick} className={`btn btn-default fz-sm text-left text-${mode}`} style={{ fontWeight: 600 }}>
            {status}
          </Link>
        ) : (
          <button type="button" onClick={onClick} className={`btn btn-default fz-sm text-left text-${mode}`} style={{ fontWeight: 600 }}>
            {status}
          </button>
        )}
      </div>
      <div className="divider" />
    </div>
  );
}
