// import Button from "@restart/ui/esm/Button";
import React from "react";
import { Button } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Courses from "./../../../../services/courses";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import { EmjsF } from "../../../../applocal";
import APP_USER from "../../../../services/APP_USER";
import { useSelector } from "react-redux";

const CustomerRating = ({ submitting, form, handleChange, data, initVals }) => {
  // const location = useLocation();
  // const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  // const initVals = params && params.data && JSON.parse(params.data);
  //
  // -------------
  // const history = useHistory();
  // const [ratings, setRatings] = useState([{ user: "User 1", rating: 5 }]);

  // const [loading, setLoading] = useState(false);
  // const { userRl, user } = useSelector((s) => s.auth);

  // const isInst = userRl == APP_USER.instructor;

  // const _rate = EmjsF(ratings).toString();

  // useEffect(() => {
  //   handleChange({ ratings: _rate });
  // }, [_rate]);

  // const addNewCourse = () => {
  //   console.log(form.getFieldError());
  //   return;
  //   setLoading(true);
  //   const formdata = new FormData();
  //   if (isInst) data.instId = user?.id;

  //   EmjsF(data).objList(({ value, key }) => {
  //     let val = value;
  //     // if (EmjsF(value).isJson()) {
  //     //   val = EmjsF(value).toString();
  //     // }
  //     if (!["createdAt", "updatedAt", "images", "status", "isDeleted"].includes(key)) formdata.append(key, val);
  //   });
  //   if (initVals && initVals._id) {
  //     formdata.append("id", initVals._id);
  //     // { ...data, id: initVals._id }
  //     Courses.updateOne(formdata, initVals._id)
  //       .then(({}) => {
  //         history.push("/adminCourses");
  //       })
  //       .catch((err) => {})
  //       .finally(() => setLoading(false));
  //   } else {
  //     Courses.add(formdata)
  //       .then(({}) => {
  //         history.push("/newLesson");
  //       })
  //       .catch((err) => {})
  //       .finally(() => setLoading(false));
  //   }
  // };

  return (
    <>
      {/* <Row className="mt-3 align-items-center">
        <h5>
          <b>Customer Rating</b>
        </h5>
      </Row>
      {ratings.map(({ user, rating }, index) => (
        <Row className="align-items-center">
          <Col sm={3} md={3} className="text-sm-end">
            <p>{user}</p>
          </Col>
          <Col sm={6} md={6} className=" ">
            <input
              type="number"
              className="form-control"
              placeholder="5"
              value={rating}
              onChange={({ target: { value } }) => {
                const _ratings = [...ratings];
                _ratings[index].rating = value;
                setRatings(_ratings);
              }}
            />
          </Col>
          <Col sm={3} md={3} className="mt-2">
            <h2>
              <i class="bi bi-check2" style={{ cursor: "pointer" }} onClick={() => setRatings([...ratings, { user: `User ${ratings.length + 1}`, rating: 5 }])}></i>
              {ratings.length !== 1 && <i class="bi bi-x" style={{ cursor: "pointer" }} onClick={() => setRatings([...ratings.filter((item, _index) => index !== _index)])}></i>}
            </h2>
          </Col>
        </Row>
      ))} */}
      <Row className="">
        <Col xs={5} className="offset-3">
          <Button /*onClick={addNewCourse}*/ loading={submitting} className="btn btn-danger" htmlType="submit" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
            {initVals && initVals._id ? "Update" : "ADD NEW"}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CustomerRating;
