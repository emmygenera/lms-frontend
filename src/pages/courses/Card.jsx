import React from "react";
import card from "./card.jpg";
import { Col } from "react-bootstrap";
const SingleProduct = () => {
    return (
        <Col sm={6} md={3} className=" card text-left">
            <img className="card-img-top " src={card} alt="not available" style={{ height: "150px" }} />
            <div className="card-body">
                <h4 className="card-title" style={{ fontSize: "13px", fontWeight: "bold" }}>
                    React js
                </h4>
                <p className="card-text" style={{ fontSize: "10px" }}>
                    Nibh fringilla ut morbi amet, fusce amet nulla ut tristique.
                </p>
                <button style={{ backgroundColor: "transparent", border: "none", float: "right" }}>
                    <i class="bi bi-trash"></i>
                </button>
                <button style={{ backgroundColor: "transparent", border: "none", float: "right" }}>
                    <i class="bi bi-pencil"></i>
                </button>
            </div>
        </Col>
    );
};

export default SingleProduct;
