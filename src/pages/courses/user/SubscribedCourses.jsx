import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../../customerIn/navbar/Navbar";
import "./usercourse.scss";
// import "../../../App.scss";
import "../admin/admincourses.scss";

// import Card from "../admin/Card";
import { arrayObjectMerge, DateTime, Get, Range } from "../../../applocal";
import Card from "./Card";
// import cardImage from "./card.jpg";
import { Col, Row, Spinner } from "react-bootstrap";
import { Select, Spin } from "antd";
// import SeventhPage from "./page7";
// import LivePage from "./page7/LivePage";
import SixthPage from "./page6";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../../redux/actions";
import { toast } from "react-toastify";
import orderService from "../../../services/orders";
import CourseAPI from "../../../services/courses";
import { useSelector } from "react-redux";
import SeventhPage from "./ViewCourse";

// const UserCourses = ({ data: { data = [], ...otherData }, isLoading }) => {
const SubscribedCourses = () => {
  const [all, setAll] = useState(false);
  const [instructors, setinstructors] = useState([]);
  const [viewCourse, setViewCourse] = useState({});
  const [filterParams, setfilterParams] = useState({});
  const [categories, setcategories] = useState(Range(0, 6, { name: "Loading category...", _id: "" }));
  const All = () => {
    all ? setAll(false) : setAll(true);
  };

  const { user } = useSelector((s) => s.auth);
  const [courses, setcourses] = useState({ data: [] });
  const [loading, setloading] = useState(true);

  function getCoures(data) {
    // console.log(data);
    setloading(true);
    orderService
      .myOrders({ id: user?.id })
      .then(async ({ data }) => {
        const orderData = data.data;
        // Promise.all(data.data.map(({ _id }) => orderService.deleteorder(_id))).finally(() => toast.success("deleted success"));
        const __data = await Promise.all(
          orderData.flatMap(({ courses }) => {
            return courses.map(({ courseId }) => {
              return courseId && CourseAPI.getSingle(courseId);
            });
          })
        ).catch(() => {
          setcourses(data);
          setloading(false);
        });
        const newCourses_ = __data.flatMap(({ data: { data } }) => data);
        const changeCourses_ = orderData.flatMap(({ courses, ..._o }) => ({ ..._o, courses: courses.map(({ courseId, ..._ }) => ({ ..._, courseId, course: { ...newCourses_.filter(({ _id }) => _id == courseId).reduce((r, l) => l) } })) }));
        setcourses({
          data: changeCourses_,
        });
        setloading(false);
      })
      .catch(() => {
        setloading(false);
        toast.error("Opps! Error getting courses");
      });
    // .finally(() => setloading(false));
  }

  function onViewCourse(data) {
    //console.log(data);
    setViewCourse(data);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getCoures();
    //getInstructors();
    //getCategories();
  }, []);

  function filterBy(data) {
    const filt = { ...filterParams, ...data };
    // filt;
    setfilterParams(filt);
    getCoures(filt);
    // Get({ url: "courses/all", data: filt }).then();
  }
  function onAddCart(data) {
    // const { target: form } = e;
    // e.preventDefault();
    // const fd = new FormData(form).entries();
    // const data = Object.fromEntries(fd);
    // course_pkg, course
    if (data?.course) {
      dispatch(setCartItem({ [data.course._id]: data }));
      toast.success("Course added to cart!", { delay: "1s" });
    } else toast.error("Select Course package!");
  }
  const data = courses?.data || [];
  // console.log(data);
  // return null;
  return (
    <>
      {/* <Navbar /> */}
      <div className=" p-4"></div>
      <Row className="container-fluid  mt-5">
        {loading ? (
          <Col className="w-100">
            <div className="p-5 fz-4 d-flex align-items-center justify-content-center">
              <Spinner size="md" animation="grow" style={{ background: "#2196f3", color: "#2196f3" }} />
            </div>
          </Col>
        ) : (
          <div className="row">
            {data?.map(({ courses, startDate, ...order }) => {
              return (
                // <div className="row">
                // <h3 className="fz-2 my-3 py-3 bd-dark-1 ">Subscribed at: {DateTime(startDate).stringFormat()}</h3>
                // {
                courses.map(({ course, ..._o }) => <Card data={course} orderInfo={{ startDate, ...order, ..._o }} onViewCourse={onViewCourse} onAddCart={onAddCart} />)
                // }
                // </div>
              );
            })}
            {data?.length == 0 && (
              <div className="alert alert-info col-12">
                <h4>You are not subscribed to any course</h4>
              </div>
            )}
          </div>
        )}
      </Row>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document" style={{ maxWidth: 700 }}>
          <div className="modal-content rad_4 overflow-hidden">
            {/* <div className="modal-header" hidden>
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <div className="modal-body p-0">
              {/* <SeventhPage /> */}
              {/* <LivePage /> */}
              {/* {viewCourse?._id && <SixthPage data={viewCourse} onAddCart={onAddCart} />} */}
              {/* {<SeventhPage data={viewCourse} onAddCart={onAddCart} />} */}
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribedCourses;
