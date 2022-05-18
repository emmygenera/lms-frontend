import React from "react";

import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
const { Paragraph } = Typography;

export default function AddonList({ purchaseStatus, addonExpired, title = "", onClick, link, details, subject = "", status = "Open", mode = "white" }) {
  const [expandable, setExpandable] = React.useState(true);
  const [clicked, setClicked] = React.useState(false);

  const toggle = () => setExpandable((p) => !p);
  const isDisabled = clicked || addonExpired;

  return (
    <div className="row">
      <div className="col-12 p-0">
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
          <>
            {/* <Paragraph onClick={toggle} ellipsis={{ symbol: " ", expandable }} className="fz-sm " style={{ cursor: "pointer" }}> */}
            {/* {link ? (
                <Link to={link} onClick={onClick} className={`py-1 text-default text-dark d-inline-block`}>
                  {subject}
                </Link>
              ) : ( */}
            {/* {subject} */}
            {/* )} */}
            {/* </Paragraph> */}
            {/* <a className="btn. " onClick={toggle}>
              {expandable ? "..." : "Collapse"}
            </a> */}
          </>
        )}
        {details && (
          <Paragraph ellipsis={{ rows: 2, symbol: " ", expandable }} className="fz-sm">
            {details}
          </Paragraph>
        )}
      </div>
      <div className="col-12 p-0 text-right">
        {!purchaseStatus ? (
          <button
            type="button"
            disabled={isDisabled}
            onClick={
              !addonExpired
                ? () => {
                    setClicked(true);
                    onClick();
                  }
                : null
            }
            className={`btn w-100 btn-${isDisabled ? "secondary" : "info"} fz-sm text-center text-${mode}`}
            style={{ fontWeight: 600 }}
          >
            {addonExpired ? "Expired" : "Purchase Addon"}
          </button>
        ) : null}
      </div>
      <div className="divider" />
    </div>
  );
}
