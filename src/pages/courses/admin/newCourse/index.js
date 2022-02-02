import React, { useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseSection from "./CourseSection";
import { Link } from "react-router-dom";
import "./index.scss";
import { useEffect } from "react";
import qs from 'query-string';
import { Form, Input } from "antd";

const NewCourse = ({ location }) => {
  const [initVals] = useState(location && location.state && location.state.course);

  if (initVals) {
    if (initVals.instructor) initVals.instructor = initVals.instructor._id;
    if (initVals.category) initVals.category = initVals.category._id;
  }
  const [data, setData] = useState(initVals);
  const handleChange = (value) => setData({ ...data, ...value })
  const _handleChange = (values) => setData({ ...data, ...values });

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home
            <span className="navspan" style={{ marginLeft: "10px" }}>
              /
            </span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  Courses
                  <span className="navspan" style={{ marginLeft: "10px" }}>
                    /
                  </span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  New Category
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h5 className="mb-5 mt-0">
        <b>Add New Course</b>
      </h5>
      <div className="ps-5 pt-4" style={{ backgroundColor: "#FFFFFF" }}>
        <Form
          name="wrap"
          labelCol={{ flex: '130px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          layout="horizontal"
          initialValues={data}
          onValuesChange={_handleChange}
        >
          <CourseInfo handleChange={handleChange} initVals={initVals} />
          <CourseSection handleChange={handleChange} data={data} initVals={initVals} />
        </Form>
      </div>
    </>
  );
};

export default NewCourse;
