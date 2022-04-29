import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../../customerIn/navbar/Navbar";
import "./usercourse.scss";
// import "../../../App.scss";
import "../admin/admincourses.scss";

// import Card from "../admin/Card";
import { arrayObjectMerge, Get, mergeArrayObjects, nullNumber, objectRemove, Range } from "../../../applocal";
import Card from "./Card";
// import cardImage from "./card.jpg";
import { Col, Row, Spinner } from "react-bootstrap";
import { Select, Spin } from "antd";
// import SeventhPage from "./page7";
// import LivePage from "./page7/LivePage";
import SixthPage from "./page6";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../../redux/actions";
import { toast } from "react-toastify";
import LoadingAnim from "../../../components/LoadingAnim";
import Courses from "../../../services/courses";
import orderService from "../../../services/orders";

// const UserCourses = ({ data: { data = [], ...otherData }, isLoading }) => {
let search_len_ = false;
const limitSize = 16;

const UserCourses = () => {
  const [all, setAll] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [instructors, setinstructors] = useState([]);
  const [viewCourse, setViewCourse] = useState({});
  const [filterParams, setfilterParams] = useState({});
  const [categories, setcategories] = useState(Range(0, 6, { name: "Loading category...", _id: "" }));
  const All = () => {
    all ? setAll(false) : setAll(true);
  };
  const { search } = useSelector((s) => s.general);
  const [pageData, setPageData] = useState({ currentPage: 0, nextPage: 1, previousPage: 0, total: 0, offsetBy: limitSize, totalPages: 0 });
  const [courses, setcourses] = useState({ data: [], subscribed: [] });
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [subloading, setsubloading] = useState(false);

  const { user } = useSelector((s) => s.auth);

  const search_len = String(search).length > 0;
  let ldmore = false;
  function _setCourses(data = courses) {
    // console.log("courses", { ...courses, ...data });
    setcourses((s) => ({ ...s, ...data }));
  }
  function getSubCoures() {
    // console.log(user?.id);
    setsubloading(true);
    orderService
      .myOrders({ id: user?.id })
      .then(({ data: { data } }) => {
        const subData = data?.flatMap(({ startDate, courses, ...order }) =>
          courses.map(({ courseId, coursePackage, course, ...cs }) => ({ orderInfo: { courseId, startDate, ...order, coursePackage }, avl_packages: coursePackage, ...objectRemove(course, ["images", "image", "instId"]), _id: courseId }))
        );
        _setCourses({ subscribed: subData });
      })
      .catch(() => toast.error("Opps! Error getting Subscribed Courses"))
      .finally(() => setsubloading(false));
  }

  if (search_len) search_len_ = true;
  function getCoures(data = {}) {
    setloading(true);

    const req = search_len ? Courses.getSearchResults : Courses.getActive;

    req({ query: search, data, pageSize: pageData.offsetBy, page: ldmore ? pageData.nextPage : 1 })
      .then(({ data: { nextPage, offsetBy, previousPage, totalPages, total, data } }) => {
        // setcourses((s) => ({ data: [...(ldmore ? s.data : []), ...data] }));
        // console.log(data);
        _setCourses({ data: [...(ldmore ? courses.data : []), ...data] });

        setPageData((state) => ({ ...state, previousPage, nextPage, total, offsetBy: nullNumber(offsetBy, limitSize), totalPages: nullNumber(totalPages, state.totalPages) }));
        ldmore = false;
      })
      .catch(() => toast.error("Opps! Error getting courses"))
      .finally(() => {
        setloading(false);
        setFiltering(false);
      });
  }
  function onViewCourse(data) {
    //console.log(data);
    setViewCourse(data);
  }

  const dispatch = useDispatch();

  //
  const getInstructors = () => {
    Get({ url: "instructors/all" }).then(({ data: { data } }) => {
      setinstructors(data);
    });
  };
  const getCategories = () => {
    Get({ url: "categories/all" }, { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDMxMTU1NjQsImV4cCI6MTY3NDY3MzE2NCwiYXVkIjoiNjFlYThlYmJmODI1MjEzYjA4MmQyZDU5IiwiaXNzIjoiZXplZXRyYWNrZXJzLmNvbSJ9.mAWv7veUFx9dvOw3wRKlAQ5EO3vdBKA-K9oTnjtlmEA" }).then(({ data: { data } }) => {
      setcategories(data);
    });
  };

  useEffect(() => {
    if (user?.id) getSubCoures();
  }, []);

  useEffect(() => {
    getInstructors();
    getCategories();
    getCoures();
  }, []);

  useEffect(() => {
    if (search_len_) getCoures();
  }, [search]);

  function onAll() {
    setFiltering(true);
    getCoures();
  }

  function filterBy(data) {
    const filt = { ...filterParams, ...data };
    setFiltering(true);

    setfilterParams(filt);
    getCoures(filt);
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
      // console.log({ [data.course._id]: data });
    } else toast.error("Select Course package!");
  }

  useEffect(() => {
    setdata(arrayObjectMerge(courses?.data, courses?.subscribed, "_id"));
  }, [courses?.data]);

  const isLoadmore = pageData.totalPages >= pageData.nextPage;
  // console.log(data);
  return (
    <>
      {/* <Navbar /> */}

      <div className=" p-3 pb-0">
        <div className="d-flex flex-wrap mt-5, fz-1  justify-contents-center align-items-center  " style={{ width: "80%", marginLeft: "15px" }}>
          <span className="categorylink fz-1 p-relative pl-0">Category :</span>
          <a className="categorylink fz-1" href="javascript:void(0)" onClick={onAll}>
            All
          </a>
          {(all ? categories.slice(0, 36) : categories).map((item, idx) => (
            <a
              key={idx}
              className="categorylink fz-1"
              to="javascript:void(0)"
              onClick={(e) => {
                e.preventDefault();
                // alert("clicked");
                filterBy({ cateId: item._id });
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
        {/* expand */}
      </div>
      <div className=" p-4">
        <span className="px-2 ">Filter By instructor:</span>
        <Select placeholder="All" onChange={(value) => filterBy({ instId: value })}>
          {instructors.map(({ name, _id }) => (
            <Select.Option value={_id}>{name}</Select.Option>
          ))}
        </Select>
        {/* <span className="px-2 ">Rating:</span>
        <Select className="mx-2 me-3" placeholder="All" onChange={(value) => filterBy({ ratings: value })}>
          {[...Array(5)].map((item, i) => (
            <Select.Option value={i + 1}>{i + 1}</Select.Option>
          ))}
        </Select> */}
      </div>

      <Row className="container-fluid  mt-5">
        {(loading && search_len_) || filtering || subloading ? (
          <></>
        ) : (
          data?.map(({ orderInfo, ...item }, idx) => {
            return <Card key={idx} orderInfo={orderInfo} data={item} onViewCourse={onViewCourse} onAddCart={onAddCart} />;
          })
        )}
      </Row>
      {!loading && data?.length == 0 && <LoadingAnim animate={false} children={<div className="alert alert-warning text-center p-4 fz-2">No data found...</div>} />}
      <div className="d-flex justify-content-center" style={{ padding: 10 }}>
        {(loading || subloading) && <Spin />}
        {isLoadmore && !loading && (
          <span className="text-center d-block">
            <button
              onClick={() => {
                ldmore = true;
                getCoures();
              }}
              className="btn shadow p-3"
              style={{ borderRadius: 300, fontSize: 16 }}
            >
              &darr;
              <i className="fa fa-bi-arrow-bar-down"></i>
            </button>
            <span className="d-block text-capitalize">View More</span>
          </span>
        )}
      </div>

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
              {viewCourse?._id && <SixthPage data={viewCourse} onAddCart={onAddCart} />}
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

export default UserCourses;
