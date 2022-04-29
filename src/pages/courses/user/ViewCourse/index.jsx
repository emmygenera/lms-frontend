import React, { useEffect, useState } from "react";
import LivePage from "./LivePage";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { DateTime, EmjsF, jsonValue, Range, toCapitalize, toLowerCase } from "../../../../applocal";
import lesson from "../../../../services/lesson";
import qs from "query-string";
import Courses from "../../../../services/courses";

import { Typography, Slider, Popconfirm, Button, Avatar, Tooltip } from "antd";
import LoadingAnim from "../../../../components/LoadingAnim";
import orderService from "../../../../services/orders";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { pmac } from "../../../../routing/indexRoutes";
import APP_USER from "../../../../services/APP_USER";
import { packagesValue } from "../../component/Data.json";

// import $ from "jquery";
// import "bootstrap";

const { Paragraph } = Typography;
const mk = { isComplete: false };

const SeventhPage = ({ location, history }) => {
  // https://emmygenera.github.io/lms/#/invoices

  const [formvalues, setformvalues] = useState({ course_pkg: "" });
  const [ConfirmOrder, setConfirmOrder] = useState([]);
  const [course, setCourse] = useState([]);
  const [CourseLessons, setCourseLessons] = useState([]);
  const [CourseLessonLoading, setCourseLessonLoading] = useState(true);
  const [CourseLoading, setCourseLoading] = useState(true);
  const [CourseOrderLoading, setCourseOrderLoading] = useState(true);
  const { data: dataParam } = qs.parse(location?.search, { parseFragmentIdentifier: true });
  const { user, userRl } = useSelector((s) => s.auth);
  const [MarkedAsComplete, setMarkedAsComplete] = React.useState([mk]);
  const [clickToNext, setClickToNext] = React.useState([]);

  const mgn = pmac([APP_USER.admin, "manager", "staff", "instructor"]).includes(userRl);
  const getCourseLessons = () => {
    setCourseLessonLoading(true);
    const lss = !mgn ? lesson.getLessonByCourseAndUser(dataParam, user.id) : lesson.getLessonByCourse(dataParam);
    lss.then(({ data: { data } }) => setCourseLessons(data.map((itm) => ({ ...itm, date: DateTime(itm.createdAt).stringFormat() })))).finally(() => setCourseLessonLoading(false));
  };

  const getCourse = () => {
    setCourseLoading(true);
    Courses.getSingle(dataParam)
      .then(({ data: { data } }) => setCourse(data))
      .finally(() => setCourseLoading(false));
  };

  function returnPackages({ render = ({ duration, item, usd, jod, index }) => {} }) {
    const packages = EmjsF(course?.avl_packages).parse();
    return packages?.map((item, index) => {
      const {
        duration,
        price: { usd = "", jod = "" },
      } = item;
      return render({ duration: toCapitalize(duration), item, usd, jod, index });
    });
  }
  function returnAddons() {
    const packages = EmjsF(course?.avl_addons).parse();
    if (!EmjsF(packages).isArray()) return [];
    const avl = packages?.map((item, index) => {
      const {
        name,
        price: { usd = "", jod = "" },
        type,
        link,
      } = item;
      return {
        name,
        type,
        link: (
          <a href={link} download={name || "courses addon " + index}>
            {type == "link" ? link : "Download " + type}
          </a>
        ),
        index,
      };
    });
    return avl;
  }
  function getUserOrder(data) {
    // console.log(data);
    setCourseOrderLoading(true);
    orderService
      .myOrders({ id: user?.id })
      .then(({ data: { data } }) => {
        // Promise.all(data.data.map(({ _id }) => orderService.deleteorder(_id))).finally(() => toast.success("deleted success"));
        setConfirmOrder(data);
      })
      .catch(() => toast.error("Opps! Error getting courses"))
      .finally(() => setCourseOrderLoading(false));
  }

  useEffect(() => {
    getCourse();
    getCourseLessons();
    getUserOrder();
    // }, [jsonValue(CourseLessons).toStringAll()]);
  }, []);

  const isusub = ConfirmOrder?.flatMap((item) => item.courses?.some(({ courseId }) => courseId == dataParam)).some((v) => v);

  function getExpiredDays() {
    const userOrder = ConfirmOrder?.map(({ courses, ...others }) => {
      const course = courses?.filter(({ courseId }) => courseId == dataParam)?.reduce((l, r) => r, {});
      return { ...others, course };
    }).reduceRight((l, r) => r, {});

    const _ConfirmOrder = userOrder;
    const months = jsonValue(packagesValue, 0).get(_ConfirmOrder?.course?.coursePackage?.duration),
      startDate = _ConfirmOrder?.startDate || _ConfirmOrder?.createdAt,
      inTime = DateTime(startDate).addMonths(months),
      expireIn = DateTime(inTime).daysToGo(),
      expireInString = expireIn <= -1 ? "Expired" : expireIn + " day" + (expireIn > 1 ? "s" : "");
    return expireInString;
  }
  function reloadFrame() {
    var iframe = document.getElementsByTagName("iframe");
    for (let idx = 0; idx < iframe.length; idx++) {
      let src = iframe[idx].src;
      iframe[idx].src = src;
    }
  }
  function onClickToNext(idx, _length) {
    reloadFrame();
    const click_to_next = Range(0, _length, (v) => ({ active: idx == v }));
    setClickToNext(click_to_next);
    window.$("#carouselExampleControls").carousel(idx);
  }

  async function delLesson(id) {
    await lesson.deletelesson(id);
    setCourseLessons((_data) => _data.filter(({ _id }) => _id !== id));
    toast.success("Successfully deleted");
  }

  if (CourseLessonLoading || CourseOrderLoading || CourseLoading) return <LoadingAnim />;
  // console.log(
  //   ConfirmOrder?.flatMap((item) => item.courses?.some(({ courseId }) => courseId == dataParam)).some((v) => v),
  //   ConfirmOrder?.some(({ userId }) => userId == user.id)
  // );
  if (mgn || (isusub && ConfirmOrder?.some(({ userId }) => userId == user.id)));
  else return <LoadingAnim animate={false} children={<p className="alert alert-warning fz-2">You are not subscribed to this course.</p>} />;

  return (
    <>
      <ul id="mynavul">
        <li>
          <Link to="" className="mynavlink" style={{ marginLeft: "0px" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="allCourses" className="mynavlink">
            Courses
          </Link>
        </li>
        <li>
          <Link disabled to="" className="mynavlink pointer-event">
            View Courses
          </Link>
        </li>
      </ul>
      <h4 className="p-3 ml-5">{course?.name}</h4>
      <Row className="justify-content-evenly">
        <Col xs={8}>
          <LivePage
            reloadFrame={reloadFrame}
            MarkedAsComplete={[MarkedAsComplete, setMarkedAsComplete]}
            isManagement={mgn}
            clickToNextSlide={clickToNext}
            expireInString={getExpiredDays()}
            CourseLessonLoading={CourseLessonLoading}
            CourseLoading={CourseLoading}
            LessonData={[CourseLessons, setCourseLessons]}
            course={course}
            avl_addons={returnAddons()}
            returnPackages={returnPackages}
            CourseAddons={CourseLessons}
            //
          />
        </Col>
        <Col xs={3} className="">
          <Row>
            <Col xs={12}>
              {mgn && (
                <div className="mb-4">
                  <Link className="btn btn-primary btn-block shadow rad_5 w-100 p-3" to={"/newLesson?cid=" + dataParam}>
                    + Add Lesson
                  </Link>
                </div>
              )}
            </Col>

            {/* <Col xs={1} className=" offset-6">
              <i className="col-sm-2" class="bi bi-three-dots-vertical"></i>
            </Col> */}
          </Row>
          <div className="shadow-sm bg-white outline-shadow p-3" style={{ borderRadius: "10px" }}>
            <Col xs={12} className="">
              <h5 className=".col-sm-4" style={{ fontWeight: "bold" }}>
                Lesson PlayLists
              </h5>
            </Col>
            {CourseLessons.map((item, idx) => {
              const mks = jsonValue(MarkedAsComplete, mk[0]).get(idx);
              const clStatus = toLowerCase(item?.completedStatus) == "completed" || mks?.isComplete;
              // var btnClass = classNames("btn", this.props.className, {
              //   "btn-pressed": this.state.isPressed,
              //   "btn-over": !this.state.isPressed && this.state.isHovered,
              // });
              return (
                <div key={idx} className="row shadow-sm">
                  <div className="col-12">
                    <a data-slide-to={idx} data-slide-id={"#carouselExampleControls"} href="javascript:void(0)" onClick={() => onClickToNext(idx, CourseLessons.length)}>
                      <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: " " }} className="card-text fz-1">
                        <b>{item?.name}</b>
                      </Paragraph>
                      <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: " " }} className="card-text fz-1">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </Paragraph>
                    </a>
                  </div>
                  <div className="col-12">
                    {mgn ? (
                      <div>
                        <Link className="p-2" to={"newLesson?data=" + item?._id + "&cid=" + dataParam}>
                          <i class="bi bi-pencil" />
                        </Link>
                        <button className={"btn text-danger"} onClick={() => delLesson(item?._id)}>
                          <i class="bi bi-trash" />
                        </button>
                      </div>
                    ) : (
                      <p className={"text-" + (clStatus ? "success" : "danger")}>{clStatus ? "Completed" : "Not Watched"}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 
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
          </div> */}
          <div></div>
        </Col>
      </Row>
    </>
  );
};

export default SeventhPage;
