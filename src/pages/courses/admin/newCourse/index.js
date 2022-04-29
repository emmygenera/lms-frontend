import React, { useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseSection from "./CourseSection";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import { useEffect } from "react";
import qs from "query-string";
import { Form, Input } from "antd";
import { EmjsF, jsonValue, objectRemove } from "../../../../applocal";
import http from "../../../../services/http";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import LoadingAnim from "../../../../components/LoadingAnim";
import Courses from "../../../../services/courses";
import APP_USER from "../../../../services/APP_USER";
import { useSelector } from "react-redux";

const NewCourse = ({ location }) => {
  const { data: qsData } = qs.parse(location?.search, { parseFragmentIdentifier: true });
  const paramData = EmjsF(qsData).parse();

  // console.log({ paramData });

  const [is_init, setis_init] = useState(false);
  // const [initVals] = useState(selectObject(paramData, ["courseStatus", "name", "description"]));
  const [initVals, setInitVals] = useState({});

  const [data, setData] = useState({});
  const handleChange = (value) => setData({ ...data, ...value });
  const _handleChange = (values) => setData({ ...data, ...values });

  if (qsData) {
    if (initVals.instructor) initVals.instructor = paramData.instructor._id;
    if (initVals.category) initVals.category = paramData.category._id;
  }

  const history = useHistory();
  const [ratings, setRatings] = useState([{ user: "User 1", rating: 5 }]);

  const [loading, setLoading] = useState(false);
  const { userRl, user } = useSelector((s) => s.auth);

  const isInst = userRl == APP_USER.instructor;

  const _rate = EmjsF(ratings).toString();

  useEffect(() => {
    handleChange({ ratings: _rate });
  }, [_rate]);

  const addNewCourse = () => {
    // console.log(form.getFieldError());
    // return;
    setLoading(true);
    const formdata = new FormData();
    if (isInst) data.instId = user?.id;

    EmjsF(data).objList(({ value, key }) => {
      let val = value;
      // if (EmjsF(value).isJson()) {
      //   val = EmjsF(value).toString();
      // }
      if (!["createdAt", "updatedAt", "images", "status", "isDeleted"].includes(key)) {
        if (key == "files") {
          if (value !== "") {
            formdata.append(key, val);
          }
        } else formdata.append(key, val);
      }
    });

    // formdata.forEach((value, key) => console.log({ [key]: value }));
    //return;
    if (initVals && initVals._id) {
      formdata.append("id", initVals._id);
      // { ...data, id: initVals._id }
      Courses.updateOne(formdata, initVals._id)
        .then(({}) => {
          // history.push("/adminCourses");
          history.push("/viewCourse?data=" + initVals?._id);
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    } else {
      Courses.add(formdata)
        .then(({ data: { data } }) => {
          history.push("/viewCourse?data=" + data?._id);
          // history.push("/newLesson");
        })
        .catch((err) => {})
        .finally(() => setLoading(false));
    }
  };

  function selectObject(data, params = []) {
    const nobj = {};
    params.forEach((v) => {
      const jv = jsonValue(data);
      if (jv.has(v)) {
        nobj[v] = jv.get(v);
      }
    });
    return nobj;
  }
  // console.log(paramData);
  async function getCourseData() {
    const {
      data: { data: courseData },
    } = await http.get("courses/single/" + paramData).catch(() => toast.error("unable to get course data"));
    // console.log(courseData?.instId);
    // setInitVals(courseData);
    // setData(objectRemove(courseData, ["instId"]));
    setInitVals({ ...courseData, cateId: courseData?.cateId?._id, instId: courseData?.instId?._id });
    setData({ ...courseData, cateId: courseData?.cateId?._id, instId: courseData?.instId?._id });
    setis_init(true);
  }
  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } else getCourseData();
  }, []);
  const [form] = Form.useForm();
  if (!is_init) {
    return <LoadingAnim />;
  }

  // console.log(EmjsF(qsData).parse());
  // console.log(initVals, "state: ", location, location?.state, "state_courses: ", location?.state?.course);
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
                  New Course
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
        <Form onFinish={addNewCourse} name="wrap" form={form} labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" initialValues={data} onValuesChange={_handleChange}>
          <CourseInfo form={form} handleChange={handleChange} /*initVals={paramData} */ initVals={initVals} />
          <CourseSection submitting={loading} handleChange={handleChange} form={form} data={data} initVals={initVals} />
        </Form>
      </div>
    </>
  );
};

export default NewCourse;
