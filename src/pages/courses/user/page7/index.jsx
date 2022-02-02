import React from "react";
import LivePage from "./LivePage";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
const SeventhPage = () => {
    return (
        <>
            <ul id="mynavul">
                <li>
                    <Link to="" className="mynavlink" style={{ marginLeft: "0px" }}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="" className="mynavlink">
                        Courses
                    </Link>
                </li>
                <li>
                    <Link to="" className="mynavlink">
                        View Courses
                    </Link>
                </li>
            </ul>
            <h4 style={{ marginLeft: "20px" }}>Live Trading Course</h4>
            <Row className="justify-content-evenly">
                <Col xs={8}>
                    <LivePage />
                </Col>
                <Col xs={3} className="shadow-sm " style={{ borderRadius: "10px" }}>
                    <Row>
                        <Col xs={4}>
                            <h6 className="col-sm-4" style={{ fontWeight: "bold" }}>
                                Lessons
                            </h6>
                        </Col>
                        <Col xs={1} className=" offset-6">
                            <i className="col-sm-2" class="bi bi-three-dots-vertical"></i>
                        </Col>
                    </Row>
                    <div className="row shadow-sm">
                        <div className="col-6">
                            <p>
                                <b>Lesson 01</b>
                            </p>
                            <p style={{ marginTop: "-14px" }}>Live Trading</p>
                            <p style={{ marginTop: "-14px" }}>Methodologies</p>
                        </div>
                        <div className="col-5 offset-1">
                            <p style={{ color: "green" }}>completed</p>
                        </div>
                    </div>
                    <div className="row shadow-sm">
                        <div className="col-6 ">
                            <p>
                                <b>Lesson 02</b>
                            </p>
                            <p style={{ marginTop: "-14px" }}>Please help me</p>
                            <p style={{ marginTop: "-14px" }}>find material</p>
                        </div>
                        <div className="col-5 offset-1">
                            <p style={{ color: "red" }}>Not watched</p>
                        </div>
                    </div>
                    <div className="row shadow-sm">
                        <div className="col-6">
                            <p>
                                <b>Lesson 03</b>
                            </p>
                            <p style={{ marginTop: "-14px" }}>Please help me</p>
                            <p style={{ marginTop: "-14px" }}>find material</p>
                        </div>
                        <div className="col-5 offset-1">
                            <p style={{ color: "red" }}>Not watched</p>
                        </div>
                    </div>
                    <div className="row shadow-sm">
                        <div className="col-6">
                            <p>
                                <b>Lesson 04</b>
                            </p>
                            <p style={{ marginTop: "-14px" }}>Please help me</p>
                            <p style={{ marginTop: "-14px" }}>find material</p>
                        </div>
                        <div className="col-5 offset-1">
                            <p style={{ color: "red" }}>Not watched</p>
                        </div>
                    </div>
                    <div></div>
                </Col>
            </Row>
        </>
    );
};

export default SeventhPage;
