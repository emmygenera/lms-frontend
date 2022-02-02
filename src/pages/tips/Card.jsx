import React from "react";
// import tip from "./tip.jpg";
import "./tipindex.scss";
import { Col, Row } from "react-bootstrap";
import { Button, Popconfirm } from "antd";

const Card = ({ tip, delTip }) => {

  return (
    <Col sm={6} md={3}>
      <div className="p-0 card text-left">
        <img className="card-img-top " src={tip.attachments[0]} alt="not available" style={{ height: "150px" }} />
        <div className="card-body">
          <h4 className="card-title" style={{ fontSize: "13px", fontWeight: "bold" }}>
            {tip.title}
          </h4>
          <p className="card-text" style={{ fontSize: "10px" }}>
            {tip.description}
          </p>
          {/* {updateFun && <Button icon={<i class="bi bi-pencil text-secondary p-1"></i>} onClick={() => updateFun(component)} />} */}
          <Popconfirm
            // visible={visible}
            title="Confirm Delete"
            onConfirm={async () => await delTip(tip._id)}
          >
            <Button icon={<i class="bi bi-trash text-secondary" />} style={{ backgroundColor: "transparent", border: "none", float: "right" }} />
          </Popconfirm>
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
