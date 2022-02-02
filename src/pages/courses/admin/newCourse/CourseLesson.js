import React from "react";
import { Row, Col } from "react-bootstrap";
const CourseLesson = ({ handleChange }) => {
  return (
    <>
      <Row className="mt-7 align-items-center" style={{ position: "relative" }}>
        <Col md={5} className="">
          <h5>
            <b>Course Lessons</b>
          </h5>
        </Col>

        <Col md={5} className="">
          <input type="text" className="form-control" placeholder="Type your course name here" />
        </Col>
        <Col md={2} className="">
          <h2 className="text-start">
            <i class="bi bi-plus" style={{ position: "absolute", top: "0px", right: "40px" }}></i>
          </h2>
        </Col>
      </Row>

      <Row className="align-items-center" style={{ position: "relative" }}>
        <Col md={5} xs={5} className="text-sm-end">
          <p>live Trading Lesson 01 </p>
        </Col>
        <Col md={2} xs={1} className="">
          <p className="pe-3">Oder</p>
        </Col>
        <Col md={4} xs={4} className="">
          <input type="text" className="form-control" placeholder="01" />
        </Col>
        <Col md={2} xs={2} className="">
          <h5 className="text-start" style={{ position: "absolute", top: "12px" }}>
            <i class="bi bi-chevron-down"></i>
            <i class="bi bi-dash"></i>
          </h5>
        </Col>
      </Row>
      <Row className="align-items-center" style={{ position: "relative" }}>
        <Col md={3} xs={5} className="text-sm-end">
          <p>live Trading Lesson 01 </p>
        </Col>
        <Col md={2} xs={1} className="text-sm-end">
          <p>Oder</p>
        </Col>
        <Col md={4} xs={4} className="">
          <input type="text" className="form-control" placeholder="01" />
        </Col>
        <Col md={3} xs={2} className="">
          <h5 className="text-start" style={{ position: "absolute", top: "12px" }}>
            <i class="bi bi-chevron-up"></i>
            <i class="bi bi-dash"></i>
          </h5>
        </Col>
      </Row>
    </>
  );
};

export default CourseLesson;
