import React from "react";
import "./question.module.scss";
import { Row, Col } from "react-bootstrap";

const Questions = () => {
    return (
        <>
            <Row className="question">
                <Col md={2} className="">
                    <div className="row">
                        <div className="col-md-9">
                            <h5>Question ID</h5>
                        </div>
                        <div className="col-md-3">
                            <span style={{ fontSize: "0.9em" }}>#555</span>
                        </div>
                    </div>
                </Col>
                <Col md={2} className="">
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Priority</h5>
                            </div>
                            <div className="col-md-6">
                                <span style={{ fontSize: "0.9em" }}>
                                    <select style={{ borderRadius: "47px", backgroundColor: "#EFEBEB", border: "none", paddingLeft: "3px", paddingRight: "3px" }}>
                                        <option>High</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={2} className="">
                    <div>
                        <div className="row justify-content-between">
                            <div className="col-md-4 ">
                                <h5>Course</h5>
                            </div>
                            <div className="col-md-8">
                                <span style={{ fontSize: "0.9em" }}>
                                    <select style={{ borderRadius: "47px", backgroundColor: "#EFEBEB", border: "none", paddingLeft: "3px", paddingRight: "3px", marginLeft: "3px" }}>
                                        <option>Live Trading 101</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={3} className="">
                    <div className="row">
                        <div className="col-md-3 offset-1">
                            <h5>Lesson</h5>
                        </div>
                        <div className="col-md-8">
                            <span style={{ fontSize: "0.9em" }}>45 Trading Types</span>
                        </div>
                    </div>
                </Col>
                <Col md={1} className="">
                    <div>
                        <h5>Status</h5>
                    </div>
                </Col>
                <Col md={2} className="">
                    <div>
                        <h5>
                            <span style={{ fontSize: "0.7em" }}>Answered</span>
                        </h5>
                    </div>
                </Col>
            </Row>
            <Row className="mb-4 mt-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">
                    SELECT
                </label>
                <div class="col-sm-10" style={{ marginLeft: "-75px" }}>
                    <input type="email" class="form-control rounded-pill" id="inputEmail3" />
                </div>
            </Row>
            <Row className="">
                <label for="details" class="col-sm-2 col-form-label">
                    DETAILS
                </label>
                <div class="col-sm-10" style={{ marginLeft: "-75px" }}>
                    <textarea type="email" class="form-control" id="details" rows="10" style={{ borderRadius: "1rem" }} />
                </div>
            </Row>
            <Row className="mt-5 ">
                <div class="col-">
                    <button className="btn  text-white " style={{ backgroundColor: "#BC1819", marginLeft: "105px", width: "75px", height: "30px" }}>
                        Reply
                    </button>
                    <button className="btn text-white" style={{ backgroundColor: "#BC1819", marginLeft: "35px", height: "30px" }}>
                        Close Question
                    </button>
                </div>
            </Row>
        </>
    );
};

export default Questions;
