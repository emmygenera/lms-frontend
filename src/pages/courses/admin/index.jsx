import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./admincourses.scss";
import Card from "./Card.jsx";
import { Spin, Menu, Select } from "antd";

import { ProtectedRoute } from "../../../components";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import qs from "query-string";
import Courses from "../../../services/courses";
import { toast } from "react-toastify";
import LoadingAnim from "../../../components/LoadingAnim";
import { setSearchString } from "../../../redux/actions/generalActions";
import APP_USER from "../../../services/APP_USER";
import { nullNumber } from "../../../applocal";
import confirmDelete from "../../functions/comfirmDelete";

const limitSize = 16;
const AdminCourses = ({ history, location }) => {
  const [all, setAll] = React.useState(false);

  // const [instructor, setInstructor] = useState(null);
  // const [rating, setRating] = useState(null);
  // const [category, setCategory] = useState(null);
  // const [search, setSearch] = useState(params.search || "");

  const [courses, setCourses] = useState([]);
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.pageNo || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState();
  const [pageData, setPageData] = useState({ currentPage: 0, nextPage: params.pageNo || 1, previousPage: 0, total: 0, offsetBy: params.pageSize || 15, totalPages: 0 });
  const [filterParams, setfilterParams] = useState({});
  const [filtering, setFiltering] = useState(false);

  const { search } = useSelector((s) => s.general);
  const { userRl, user } = useSelector((s) => s.auth);
  let ldmore = false;

  const dispatch = useDispatch();

  const All = () => setAll(!all);

  const { categories, instructors } = useSelector((state) => state.general);

  function filterBy(data) {
    const filt = { ...filterParams, ...data };
    setFiltering(true);

    setfilterParams(filt);
    loadMore(filt);
  }

  useEffect(() => {
    loadMore();
  }, [page, pageSize, search]);
  // console.log(params.search, search);
  const deleteCourse = async (id) => {
    if (confirmDelete()) {
      setCourses((_data) => {
        const newData = [...courses.filter(({ _id }) => _id !== id)];
        return newData;
      });
      toast.success("Successfully deleted");
      return await Courses.deleteOne(id);
    }
  };
  const isLoadmore = pageData.totalPages >= pageData.nextPage;

  const loadMore = (dataFilter = {}) => {
    setLoading(true);

    const search_len = String(search).length > 0;

    history.push(`?pageNo=${search_len ? 1 : pageData.nextPage}&pageSize=${pageData.offsetBy}` + (search_len ? `&search=${search}` : ""));

    if (userRl == APP_USER.instructor) {
      dataFilter.instId = user?.id;
    }

    const req = search_len ? Courses.getSearchResults : Courses.getPaginated;
    // console.log({ search, len: search_len, req: req.name });
    req({ pageNo: ldmore ? pageData.nextPage : 1, pageSize: pageData.offsetBy, query: search, data: dataFilter })
      .then(({ data: { nextPage, offsetBy, previousPage, totalPages, total, data } }) => {
        // console.log({ courses });
        setCourses([...(ldmore ? courses : []), ...data]);

        setPageData((state) => ({ ...state, previousPage, nextPage, total, offsetBy: nullNumber(offsetBy, limitSize), totalPages: nullNumber(totalPages, state.totalPages) }));
        ldmore = false;

        // setCourses(search_len ? courses : (state) => [...state, ...courses]);
        // if (!search_len) setPageData((state) => ({ ...state, previousPage, nextPage, total, offsetBy: Number(offsetBy), totalPages: Number(totalPages) }));
      })
      .finally(() => {
        setLoading(false);
        setFiltering(false);
      });
  };

  function onAll() {
    setFiltering(true);
    loadMore();
  }
  const isInst = userRl == APP_USER.instructor;
  // console.log(pageData);
  // const handleSearch = () => history.push(`?page=${page}&pageSize=${pageSize}&search=${search}`)

  return (
    <>
      <nav class="  navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Home <span style={{ marginLeft: "10px" }}>/</span>
          </Link>
          {/* {loading && <Spin style={{ position: "absolute", top: '50%' }} />} */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="adminCourses">
                  Courses <span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="adminCourses">
                  View Courses
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h5 className="fw-bold  mt-0">Courses List</h5>

      <Row className="mb-5">
        <Col xs={5}>
          <div class="addmycourse1 input-group mb-3">
            <input type="text" class="form-control" placeholder="input search text" aria-label="Recipient's username" aria-describedby="button-addon2" defaultValue={search} onChange={({ target: { value } }) => dispatch(setSearchString(value))} />
            <button class="btn btn-success" type="button" id="button-addon2">
              Search
            </button>
          </div>
        </Col>

        <Col xs={3} className="offset-4">
          <Row>
            <Col xs={2}></Col>
            <Col xs={10}>
              <Link className="" to="newCourse">
                <p className="addmycourse font-bold" style={{ backgroundColor: "#F1F1F1" }}>
                  <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M29.75 0H4.25C3.12283 0 2.04183 0.447767 1.2448 1.2448C0.447767 2.04183 0 3.12283 0 4.25L0 29.75C0 30.8772 0.447767 31.9582 1.2448 32.7552C2.04183 33.5522 3.12283 34 4.25 34H29.75C30.8772 34 31.9582 33.5522 32.7552 32.7552C33.5522 31.9582 34 30.8772 34 29.75V4.25C34 3.12283 33.5522 2.04183 32.7552 1.2448C31.9582 0.447767 30.8772 0 29.75 0V0ZM4.25 2.83333H29.75C30.1257 2.83333 30.4861 2.98259 30.7517 3.24827C31.0174 3.51394 31.1667 3.87428 31.1667 4.25V19.8333H2.83333V4.25C2.83333 3.87428 2.98259 3.51394 3.24827 3.24827C3.51394 2.98259 3.87428 2.83333 4.25 2.83333V2.83333ZM29.75 31.1667H4.25C3.87428 31.1667 3.51394 31.0174 3.24827 30.7517C2.98259 30.4861 2.83333 30.1257 2.83333 29.75V22.6667H31.1667V29.75C31.1667 30.1257 31.0174 30.4861 30.7517 30.7517C30.4861 31.0174 30.1257 31.1667 29.75 31.1667Z"
                      fill="#179A0F"
                    />
                    <path
                      d="M13.4767 16.8007C13.6914 16.9271 13.936 16.9938 14.1851 16.9938C14.4342 16.9938 14.6788 16.9271 14.8934 16.8007L21.9767 12.5507C22.1862 12.4247 22.3595 12.2467 22.4798 12.034C22.6001 11.8212 22.6634 11.581 22.6634 11.3366C22.6634 11.0922 22.6001 10.8519 22.4798 10.6392C22.3595 10.4264 22.1862 10.2484 21.9767 10.1225L14.8934 5.8725C14.6787 5.7442 14.4339 5.67502 14.1839 5.67198C13.9338 5.66894 13.6874 5.73215 13.4697 5.85518C13.252 5.97822 13.0707 6.1567 12.9443 6.37248C12.8179 6.58827 12.7508 6.83367 12.75 7.08375V15.5837C12.7517 15.8329 12.82 16.0772 12.9477 16.2911C13.0755 16.5051 13.2582 16.681 13.4767 16.8007V16.8007ZM15.5833 9.58558L18.4974 11.3337L15.5833 13.0819V9.58558Z"
                      fill="#179A0F"
                    />
                    <path
                      d="M9.91674 25.5H7.08341C6.70769 25.5 6.34736 25.6493 6.08168 25.9149C5.816 26.1806 5.66675 26.5409 5.66675 26.9167C5.66675 27.2924 5.816 27.6527 6.08168 27.9184C6.34736 28.1841 6.70769 28.3333 7.08341 28.3333H9.91674C10.2925 28.3333 10.6528 28.1841 10.9185 27.9184C11.1841 27.6527 11.3334 27.2924 11.3334 26.9167C11.3334 26.5409 11.1841 26.1806 10.9185 25.9149C10.6528 25.6493 10.2925 25.5 9.91674 25.5Z"
                      fill="#179A0F"
                    />
                    <path
                      d="M26.9167 25.5H15.5834C15.2077 25.5 14.8474 25.6493 14.5817 25.9149C14.316 26.1806 14.1667 26.5409 14.1667 26.9167C14.1667 27.2924 14.316 27.6527 14.5817 27.9184C14.8474 28.1841 15.2077 28.3333 15.5834 28.3333H26.9167C27.2925 28.3333 27.6528 28.1841 27.9185 27.9184C28.1842 27.6527 28.3334 27.2924 28.3334 26.9167C28.3334 26.5409 28.1842 26.1806 27.9185 25.9149C27.6528 25.6493 27.2925 25.5 26.9167 25.5Z"
                      fill="#179A0F"
                    />
                  </svg>
                  &nbsp; Add New Course
                </p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="p-2 mb-2" style={{ backgroundColor: "#FFFFFF" }}>
        <div>
          <div className="d-flex flex-wrap my-3 justify-contents-center align-items-center " style={{ width: "80%", marginLeft: "10px" }}>
            <span className="categorylink fz-1 p-relative pl-0">Category :</span>
            <a
              //
              href="javascript:void(0)"
              className="categorylink  fz-1 p-relative"
              style={{ top: 0, border: 0, backgroundColor: "transparent" }}
              onClick={onAll}
            >
              All
            </a>
            {/* <Menu onClick={(e) => filterBy({ cateId: e.key })} selectedKeys={[filterParams?.cateId]} mode="horizontal" className="border-0"> */}
            {categories.slice(0, all ? categories.length : 35).map(({ name, _id }) => (
              <a
                //
                href="javascript:void(0)"
                onClick={(e) => filterBy({ cateId: _id })}
                key={_id}
                className="categorylink  fz-1 p-relative"
                style={{ top: 0, border: 0, backgroundColor: "transparent" }}
              >
                {/* <Menu.Item key={_id} className="categorylink fz-sm p-relative" style={{ top: -10, border: 0 }}> */}
                {name}
                {/* </Menu.Item> */}
              </a>
            ))}
            {/* </Menu> */}
            {/* {categories.slice(0, all ? categories.length : 5).map(({ name, _id }) => <div key={_id} className="categorylink" onClick={() => setCategory(_id)}>{name}</div>)} */}
          </div>
          {/* <div id="divdrop" className="dropdown float-end">
            <button id="btndrop" class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Expand
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item" href="#">
                Another action
              </a>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div> */}
        </div>

        <div className="" style={{ marginLeft: "10px" }}>
          {!isInst && (
            <>
              <span className="px-2 ">Filter By instructor:</span>
              <Select
                //
                showSearch
                optionFilterProp="children"
                style={{ width: "10%" }}
                placeholder="All"
                value={filterParams?.instId}
                onChange={(value) => filterBy({ instId: value })}
                /*
                 showSearch
    optionFilterProp="children"
    onSearch={onSearch}
    filterOption={(input, option) =>  
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 
      || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
                */
              >
                {instructors.map(({ name, _id }) => (
                  <Select.Option value={_id}>{name}</Select.Option>
                ))}
              </Select>
            </>
          )}
          {/* <span className="px-2 ">Rating:</span>
          <Select style={{ width: "10%" }} className="mx-2 me-3" onChange={(value) => filterBy({ rating: value })} value={filterParams?.rating} placeholder="All">
            {[...Array(5)].map((item, i) => (
              <Select.Option value={i + 1}>{i + 1}</Select.Option>
            ))}
          </Select> */}
        </div>
      </div>
      <div className="mt-5" style={{ backgroundColor: "white" }}>
        <Row>{!filtering && courses?.map((course, idx) => <Card deleteCourse={deleteCourse} course={course} key={idx} />)}</Row>

        {!loading && courses.length == 0 && <LoadingAnim animate={false} children={<div className="alert alert-warning text-center p-4 fz-2">No data found...</div>} />}
        <div className="d-flex justify-content-center" style={{ padding: 10 }}>
          {(loading || filtering) && <Spin />}
          {isLoadmore && !loading && (
            <span className="text-center d-block">
              <button
                onClick={() => {
                  ldmore = true;
                  loadMore();
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
      </div>
    </>
  );
};

export default AdminCourses;
