import React from "react";
import card from "./card.jpg";
import "./usercourse.scss";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
const Card = () => {
    return (
        <Col sm={6} md={3} className=" card text-left">
            <Link to="sixthPage">
                <img className="card-img-top " src={card} alt="not available" style={{ height: "150px" }} />
            </Link>
            <Link to="sixththPage">
                <div className="card-body">
                    <h4 className="card-title" style={{ fontSize: "13px", fontWeight: "bold" }}>
                        React js
                    </h4>
                    <p className="card-text" style={{ fontSize: "10px" }}>
                        Nibh fringilla ut morbi amet, fusce amet nulla ut tristique.
                    </p>
                    <label htmlFor="" style={{ display: "block", fontSize: "10px" }}>
                        Duration
                    </label>
                    <select style={{ fontSize: "10px", marginTop: "5px" }}>
                        <option value="" selected>
                            1 Month 500 JOD
                        </option>
                        <option value="">2 Month 600 JOD</option>
                        <option value="">3 Month 700 JOD</option>
                    </select>
                    <button style={{ backgroundColor: "transparent", border: "none", float: "right" }}>
                        <i class="bi bi-cart-plus"></i>
                    </button>
                </div>
            </Link>
        </Col>
    );
};

export default Card;
