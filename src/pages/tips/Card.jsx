import React, { useState } from "react";
// import tip from "./tip.jpg";
import "./tipindex.scss";
import { Col, Row } from "react-bootstrap";
import { Button, Popconfirm, Typography } from "antd";
import { baseUrl } from "../../applocal";
import { BASE_URL } from "../../services/config.json";

const { Paragraph } = Typography;
const Card = ({ tip, delTip, onViewTip, isManagement }) => {
  const [img_path, set_img_path] = useState(BASE_URL + (tip?.image || tip?.images[0])?.url);
  const img = new Image();
  img.src = img_path;
  img.onerror = () => {
    set_img_path(baseUrl("default-image.png"));
  };
  const updateFun = ({ _id }) => {
    window.location.replace(baseUrl("#/newTip?data=" + _id));
  };
  return (
    <Col sm={6} md={3}>
      <div className="p-0 card text-left">
        <a href="javascript:void(0)" onClick={() => onViewTip(tip)} className="text-dark">
          <img className="card-img-top img" data-toggle={"modal"} data-target="#tipModal" src={img_path} alt="not available" style={{ height: 200 }} />
        </a>
        <div className="card-body">
          <a href="javascript:void(0)" data-toggle={"modal"} data-target="#tipModal" onClick={() => onViewTip(tip)} className="text-dark">
            <Paragraph ellipsis={{ rows: 1, expandable: false, symbol: " " }} className="card-title fz-1-5 m-0" style={{ fontWeight: "bold" }}>
              {tip?.title}
            </Paragraph>
            <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: " " }} className="card-text fz-1">
              <div
                dangerouslySetInnerHTML={{
                  __html: tip?.description,
                }}
              />
            </Paragraph>
          </a>
          {isManagement && (
            <div className="d-flex justify-content-end">
              {updateFun && <Button icon={<i class="bi bi-pencil text-secondary p-1"></i>} onClick={() => updateFun(tip)} />}
              <Popconfirm
                // visible={visible}
                title="Confirm Delete"
                onConfirm={async () => await delTip(tip._id)}
              >
                <Button icon={<i class="bi bi-trash text-secondary" />} style={{ backgroundColor: "transparent", border: "none", float: "right" }} />
              </Popconfirm>
            </div>
          )}
          {/* <button style={{ backgroundColor: "transparent", border: "none", float: "right" }} onClick={() => delTip(tip._id)}>
            <i class="bi bi-trash"></i>
          </button> */}
          {/* <button style={{ backgroundColor: "transparent", border: "none", float: "right" }} >
            <i class="bi bi-pencil"></i>
          </button> */}
        </div>
      </div>
    </Col>
  );
};

export default Card;
