import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import qs from "query-string";

import "./categories.scss";

import { Table } from "antd";
import { CustomPagination, Actions } from "../../components";
import Category from "../../services/category";
import { EmjsF, alphabetIndex, DateTime, nullNumber } from "../../applocal";
import { toast } from "react-toastify";
import confirmDelete from "../functions/comfirmDelete";

const Categories = (props) => {
  // :TODO: REDUX

  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [nameFilters, setNameFilters] = useState([]);
  const [parenteFilters, setParentFilters] = useState([]);
  const [pageData, setPageData] = useState({ currentPage: 0, nextPage: params.pageNo || 1, previousPage: 0, total: 0, offsetBy: params.pageSize || 4, totalPages: 0 });

  const deleteCat = async (id) => {
    if (confirmDelete()) {
      setDate((_data) => {
        const newData = [..._data.filter(({ _id }) => _id !== id)];
        return newData;
      });
      toast.success("Successfully deleted");
      return await Category.deleteCategory(id);
    }
  };

  const updateCat = ({ name, _id: id, parent }) => props.history.push(`/newCategory?id=${id}&parent=${parent}&name=${name}`);

  const actions = (category) => <Actions component={category} deleteFun={deleteCat} updateFun={updateCat} />;

  useEffect(() => {
    setLoading(true);
    const page = pageData.nextPage;
    const pageSize = pageData.offsetBy;
    props.history.push(`?pageNo=${page}&pageSize=${pageSize}`);
    Category.getPaginated(page, pageSize)
      .then(({ data: { nextPage = 2, offsetBy = 0, previousPage = 0, totalPages = 0, total = 0, data: categories } }) => {
        // .then(({ data: { categories, total } }) => {
        // setPageData((state) => ({ ...state, previousPage, nextPage, total, offsetBy: Number(offsetBy), totalPages: Number(totalPages) }));
        // console.log({ offsetBy, totalPages });
        // setPage(offsetBy);
        // setPageSize(totalPages);
        setTotal(total);

        setDate(categories.map((category, index) => ({ ...category, index: index + 1, actions: actions(category), date: moment(category.createdAt).format("L") })));
        setNameFilters(categories.map(({ name }) => ({ value: name, text: name })));

        const _pa = {};
        categories.map(({ parent }) => {
          if (String(parent).trim()) {
            _pa[parent] = parent;
          }
        });
        setParentFilters(EmjsF(_pa).objList(({ key, value }) => ({ value, text: key })));
      })
      .finally(() => setLoading(false));
    //console.log({ page, pageSize });
  }, [page, pageSize]);

  const isLoadmore = pageData.totalPages >= pageData.nextPage;

  const loadMore = () => {
    // setLoading(true);
    // history.push(`?pageNo=${pageData.nextPage}&pageSize=${pageData.offsetBy}&search=${search}`);
    // Courses.getPaginated({ page: pageData.nextPage, pageSize: pageData.offsetBy, query: search, instructor, category, rating })
    //   .then(({ data: { nextPage, offsetBy, previousPage, totalPages, total, data: courses } }) => {
    //     setCourses((state) => [...state, ...courses]);
    //     setPageData((state) => ({ ...state, previousPage, nextPage, total, offsetBy: Number(offsetBy), totalPages: Number(totalPages) }));
    //   })
    //   .finally(() => setLoading(false));
  };

  const columns = [
    {
      title: "Cat ID",
      dataIndex: "index",
      width: "30%",
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime());
      },
      sortDirections: ["descend"],
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: (a, b) => {
        // console.log(a.name, String(a.name).slice(0, 1), alphabetIndex(String(a.name).slice(0, 1)));
        return alphabetIndex(String(a.name).slice(0, 1));
      },
      sortDirections: ["ascend", "descend"],
      // filters: nameFilters,
      // onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Parent",
      dataIndex: "parent",
      filters: parenteFilters,
      onFilter: (value, record) => record?.parent?.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  return (
    <>
      <nav id="catnav" class="mt-4 ps-4  navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home <span style={{ marginLeft: "10px" }}>/</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  Courses <span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  View Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h5 classclassName="ms-5 mb-8" style={{ marginTop: "-6px" }}>
        <b className="">Course Category List</b>
      </h5>
      <Row className=" mt-3 mb-2 mt-6">
        <Col sm={3}>
          <Link className="d-inline-flex linkbtn" to="newCategory" style={{ backgroundColor: "#F1F1F1" }}>
            <i class="ps-2 bi bi-stack"></i>
            <p className="ps-2">Add New Category</p>
          </Link>
        </Col>
        <Col sm={8}></Col>
      </Row>

      <Row>
        <Col md={6} style={{ backgroundColor: "FFFFFF" }}>
          <Table className="mb-4" columns={columns} dataSource={data} pagination={false} loading={loading} />
          <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
        </Col>
      </Row>
    </>
  );
};

export default Categories;
