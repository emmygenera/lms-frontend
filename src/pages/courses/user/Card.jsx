import React, { useEffect } from "react";
import card from "./card.jpg";
import "./usercourse.scss";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../services/config.json";
import { Row, Col } from "react-bootstrap";
import { Typography, Slider, Popconfirm, Button, Avatar, Tooltip } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { useState } from "react";
import { baseUrl, DateTime, EmjsF, jsonValue, setImageIfError, stripTags, toCapitalize, toLowerCase } from "../../../applocal";
import { packagesValue } from "../component/Data.json";
import moment from "moment";
import lesson from "../../../services/lesson";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;

const Card = ({ data: course, orderInfo, onAddCart, onViewCourse }) => {
  const [formvalues, setformvalues] = useState({ course_pkg: "" });

  const jv = jsonValue;

  const [img_path, set_img_path] = useState(BASE_URL + jv(course?.images, {}).get(0)?.url);
  const [ins_img_path, set_ins_img_path] = useState(BASE_URL + jv(course?.instId?.images).get(0)?.url);

  const [CourseLessonLoading, setCourseLessonLoading] = useState(false);
  const [CourseLessons, setCourseLessons] = useState([]);

  // const [completionIn, setcompletionIn] = useState("0%");

  const { user, userRl } = useSelector((s) => s.auth);

  //
  // console.log({ user, userRl });
  const courseId = orderInfo?.courseId;
  //console.log({ img_path, course: course?.name, inst: course?.instId, ins_img_path });
  setImageIfError(
    img_path,
    () => {
      set_img_path(baseUrl("default-image.png"));
    },
    (v) => set_img_path(v)
  );
  setImageIfError(
    ins_img_path,
    () => {
      set_ins_img_path(baseUrl("avatar-default.png"));
    },
    (v) => {
      set_ins_img_path(v);
    }
  );

  const getCourseLessons = () => {
    setCourseLessonLoading(true);
    const lss = lesson.getLessonByCourseAndUser(courseId, user?.id);
    lss
      .then(({ data: { data } }) => setCourseLessons(data.map((itm) => ({ ...itm, date: DateTime(itm.createdAt).stringFormat() }))))
      .finally(() => setCourseLessonLoading(false))
      .catch(console.log);
  };

  const lessonCompleted = CourseLessons.filter((itm) => toLowerCase(itm.completedStatus) == "completed").length;
  const lessonTotal = CourseLessons?.length;
  const lessonProg = Math.ceil((lessonCompleted / lessonTotal) * 100);
  // console.log({ lessonProg });
  const packages = EmjsF(course.avl_packages).parse();

  const paidStatus = toLowerCase(orderInfo?.paymentstatus) == "paid",
    completionIn = CourseLessonLoading ? "loading" : lessonProg + "%",
    orderStatus = toLowerCase(orderInfo?.orderstatus) == "ordered";

  const months = jsonValue(packagesValue, 0).get(orderInfo?.coursePackage?.duration),
    startDate = orderInfo?.startDate,
    inTime = DateTime(startDate).addMonths(months),
    isCourseExpired = DateTime(inTime).expired();

  const dateSub = moment(startDate).fromNow();
  // const expireIn = moment(inTime, DateTime().now()).diff(Date.now(), "hours"),
  const expireIn = DateTime(inTime).daysToGo(),
    expireInString = expireIn == -1 ? "Expired" : expireIn + " day" + (expireIn > 1 ? "s" : "");

  function openModal(e) {
    e.preventDefault();
    if (paidStatus) {
      window.location.replace(baseUrl("#/viewCourse?data=" + courseId));
      window.history.replaceState({ _id: Math.random() }, "", baseUrl("#/viewCourse?data=" + courseId));
      return;
    }

    onViewCourse(course);
  }

  useEffect(() => {
    if (courseId) getCourseLessons();
  }, []);

  return (
    <Col sm={6} md={3}>
      <style jsx>
        {!userRl &&
          `
          .card-img-top.img {
            height: 291px !important;
          }
        `}
      </style>
      <div className="p-0 card text-left">
        {/* BASE_URL + */}

        <a href="#" data-toggle={!paidStatus ? "modal" : ""} data-target="#exampleModal" onClick={openModal}>
          <img className="card-img-top img" width={"100%"} style={{ height: 250 }} src={img_path} alt="not available" />
        </a>
        <div className="card-body" style={{ position: "relative" }}>
          {paidStatus && (
            <div className="d-flex justify-content-end align-items-center">
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.498535 3.00027C0.498535 1.34301 1.84202 -0.000976562 3.49929 -0.000976562C5.15655 -0.000976562 6.50004 1.34301 6.50004 3.00027C6.50004 4.65754 5.15655 6.00152 3.49929 6.00152C1.84202 6.00152 0.498535 4.65754 0.498535 3.00027Z"
                  //
                  fill={isCourseExpired ? "#FF4D4F" : "#52C41A"}
                />
              </svg>
              <span> {isCourseExpired ? "Expired" : "Active"}</span>
            </div>
          )}
          <a href="#" data-toggle={!paidStatus ? "modal" : ""} data-target="#exampleModal" onClick={openModal}>
            <Paragraph ellipsis={{ rows: 1, expandable: false, symbol: " " }} className="card-title fz-1-5 m-0" style={{ fontWeight: "bold" }}>
              {course?.name}
            </Paragraph>
            <Paragraph ellipsis={{ rows: 1, expandable: false, symbol: " " }} className="card-text fz-1">
              {stripTags(course?.description)}
            </Paragraph>
          </a>
          <div className="p-relative">
            <div className="row">
              <div className="col-6 p-0">{paidStatus && <span>{dateSub} </span>}</div>
              <div className="col-6 p-0">
                <div className="d-flex justify-content-end" style={{ position: "abssolute", right: "10px" }}>
                  <Avatar.Group
                    maxCount={2}
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                    }}
                  >
                    <span className="p-2 mr-2">{toCapitalize(course?.instId?.name || "Instructor")}</span>
                    <span style={{ flexGrow: 1 }}>
                      <Avatar src={ins_img_path} />
                    </span>
                    {/* <Avatar src="https://joeschmoe.io/api/v1/random" /> */}
                    {/* <Avatar
                      style={{
                        backgroundColor: "#f56a00",
                      }}
                    ></Avatar>
                    <Avatar
                      style={{
                        backgroundColor: "#f56a00",
                      }}
                    ></Avatar> */}
                    {/* <Tooltip title="Ant User" placement="top">
                  <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                </Tooltip> */}
                    {/* <Avatar style={{ backgroundColor: "#1890ff" }} icon={<AntDesignOutlined />} /> */}
                  </Avatar.Group>
                </div>
              </div>
            </div>
          </div>
          {paidStatus && (
            <div className="row py-2">
              <div className="col-4 p-0">
                <p className="fw-bold fz-sm text-nowrap">Expire In</p>
                <p className="fz-1">{expireInString}</p>
              </div>
              <div className="col-4 p-0">
                <p className="fw-bold fz-sm text-nowrap">Completion</p>
                <p className="fz-1">{completionIn}</p>
              </div>
              <div className="col-4 p-0">
                {/* <p className="fz-sm text-nowrap pl-3">{toCapitalize(course?.instId?.name)}</p>
                <p className="fz-1"></p> */}
              </div>
            </div>
          )}
          {!paidStatus && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAddCart(formvalues);
              }}
            >
              <div className="form-group row align-items-center">
                <label className="col-12 p-0 py-1 fz-1" style={{ display: "block" }}>
                  Duration
                </label>
                <div className="col-8 p-0">
                  {/* <input type="hidden" name="cid" className="" /> */}
                  <select
                    name="course_pkg"
                    onChange={(e) => {
                      setformvalues({ course_pkg: e.target.value, course });
                    }}
                    className="w-100 form-control"
                    style={{ fontSize: "10px", marginTop: "5px" }}
                  >
                    <option value="" selected>
                      Select Package
                    </option>
                    {packages.map((itm, index) => {
                      const {
                        duration,
                        price: { usd = "", jod = "" },
                      } = itm;
                      return (
                        <option key={index} value={jsonValue(itm).toStringAll()}>
                          {duration} - {usd} USD - {jod} JOD
                        </option>
                      );
                    })}

                    {/* <option value="">3 Month 700 JOD</option> */}
                  </select>
                </div>
                <div className="col-4 p-0">
                  <button type="submit" style={{ backgroundColor: "transparent", border: "none", float: "right" }}>
                    <i class="bi bi-cart-plus"></i>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </Col>
  );
  return (
    <Col sm={6} md={3} className=" card text-left">
      <Link className="dcategorylink" to="sixthPage">
        <img className="card-img-top " src={card} alt="not available" style={{ height: "150px" }} />
      </Link>
      <Link className="dcategorylink" to="sixththPage">
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
