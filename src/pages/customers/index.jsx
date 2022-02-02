import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Pagination, Table } from "antd";
import "./customerindex.scss";

import Customer from "../../services/customer";
import { CustomPagination, Actions } from "../../components";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import qs from "query-string";
import { toast } from "react-toastify";

const Customers = (props) => {
  const history = useHistory();
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(params.query || "");
  const [nameFilters, setNameFilters] = useState([]);
  const [courseFilters, setCourseFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  useEffect(() => {
    getData();
    setPage(1);
  }, [search]);

  const deleteCus = async (id) => {
    setDate((_data) => {
      const newData = [..._data.filter(({ _id }) => _id !== id)];
      return newData;
    });
    toast.success("Successfully deleted");
    return await Customer.deleteCustomer(id);
  };

  const updateCus = (data) => props.history.push(`/newCustomer?data=${data}`);
  const actions = (customer) => <Actions component={customer} deleteFun={deleteCus} updateFun={() => updateCus(JSON.stringify(customer))} />;

  const getData = () => {
    setLoading(true);
    props.history.push(`?page=${page}&pageSize=${pageSize}`);
    Customer.getPaginated(page, pageSize)
      .then(({ data: { customers, total } }) => {
        setTotal(total);
        setDate(customers.map((customer, index) => ({ ...customer, status: "Active", completion: "60%", courses: "Live Trading Courses", index: index + 1, actions: actions(customer), date: moment(customer.createdAt).format("L") })));
        setNameFilters(customers.map(({ name }) => ({ value: name, text: name })));
        setCourseFilters(customers.map(({ course }) => ({ value: course, text: course })));
        setStatusFilters(customers.map(({ status }) => ({ value: status, text: status })));
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      title: "Cust. Id",
      dataIndex: "index",
    },

    {
      title: "Join Date",
      dataIndex: "date",
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "customer Name",
      dataIndex: "name",
      filters: nameFilters,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.startsWith(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Active courses",
      dataIndex: "courses",
      filters: courseFilters,
      onFilter: (value, record) => record.course.startsWith(value),
    },
    {
      title: "Completion percentage",
      dataIndex: "completion",
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Status",
      dataIndex: "status",
      filters: statusFilters,
      onFilter: (value, record) => record.status.startsWith(value),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "actions",
    },
  ];

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        <Col sm={3}>
          <Link className="d-inline-flex clinkbtn p-md-3" to="newCustomer" style={{ backgroundColor: "#F1F1F1" }}>
            <p className=" px-2 px-md-4">+New Customer</p>
          </Link>
        </Col>
        <Col sm={9} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
          <Row className="py-md-2">
            <Col sm={6} md={7} className="hidediv" style={{ position: "relative" }}>
              <i class="bi bi-person searchicon"></i>
              <input className="" id="csearchinput" type="search" placeholder="Search here" value={search} onChange={(e) => setSearch(e.target.value)} />
              <i class="bi bi-search" id="sicon"></i>
            </Col>
            <Col sm={6} md={5}>
              <button id="cbtndelete" style={{ float: "right" }}>
                Delete
              </button>
              <button id="cbtnedit" style={{ float: "right" }}>
                Edit
              </button>
              <button id="cbtnactive" style={{ float: "right" }}>
                <h6 id="cicon" style={{ display: "inline", marginRight: "2px" }}>
                  <i class="bi bi-check2-square" style={{ color: "green" }}></i>
                </h6>
                Active
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4">
        <Table columns={columns} dataSource={data} pagination={false} loading={loading} />
        <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
      </div>
    </>
  );
};

export default Customers;
