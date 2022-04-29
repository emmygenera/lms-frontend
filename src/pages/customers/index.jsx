import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Pagination, Popconfirm, Table } from "antd";
import "./customerindex.scss";

import Customer from "../../services/customer";
import { CustomPagination, Actions } from "../../components";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import qs from "query-string";
import { toast } from "react-toastify";
import User from "../../services/user";
import orderService from "../../services/orders";
import { alphabetIndex, arrayObjectMerge, DateTime, jsonValue, nullNumber } from "../../applocal";
import PaginatedTable from "../../components/PaginatedTable";

const Customers = (props) => {
  const history = useHistory();
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [OrdersLoading, setOrdersLoading] = useState(false);
  const [search, setSearch] = useState(params.query || "");
  const [nameFilters, setNameFilters] = useState([]);
  const [courseFilters, setCourseFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [filters, setFilters] = useState({
    phone: [],
    email: [],
    name: [],
    courses: [],
  });
  function _setFilter(key = filters, value = {}) {
    setFilters((s) => ({ ...s, [key]: arrayObjectMerge(s[key], [value], "value") }));
  }

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
  const actions = (customer) => <Actions component={customer} onView={() => props.history.push("customerOverview?data=" + customer?._id)} deleteFun={deleteCus} updateFun={() => updateCus(customer?._id)} />;

  const getData = () => {
    setLoading(true);
    props.history.push(`?page=${page}&pageSize=${pageSize}`);
    // Customer
    User.getPaginated(page, pageSize)
      .then(({ data: { data: customers, total } }) => {
        setTotal(total);
        setOrdersLoading(true);
        Promise.all(customers.map((customer, index) => orderService.myOrders({ id: customer._id })))
          .then((data) => {
            const obj = {};
            data.map(({ data: { data = [] } }) => {
              data.map((item) => {
                obj[item?.userId] = jsonValue(obj, 0).get("userId") + (item?.courses?.length || 0);
              });
            });
            setResData(customers, obj);
          })
          .catch(() => setResData(customers))
          .finally(() => setOrdersLoading(false));

        customers.map((itm, index) => {
          _setFilter("phone", { text: itm?.phone, value: itm?.phone });
          _setFilter("email", { text: itm?.email, value: itm?.email });
          _setFilter("name", { text: itm?.name, value: itm?.name });
        });

        setNameFilters(customers.map(({ name }) => ({ value: name, text: name })));
        setCourseFilters(customers.map(({ course }) => ({ value: course, text: course })));
        setStatusFilters(customers.map(({ status }) => ({ value: status, text: status })));
      })
      .finally(() => setLoading(false));
    function setResData(customers = [], obj = []) {
      setDate(
        customers.map((customer, index) => {
          _setFilter("courses", { text: obj[customer._id] || 0, value: obj[customer._id] || 0 });
          return {
            ...customer,
            status: customer?.status == 1 ? "Active" : "Deactived",
            name: customer?.name || String(customer?.email).split("@").at(0),
            completion: "",
            courses: obj[customer._id] || 0,
            index: index + 1,
            //
            actions: actions(customer),
            date: moment(customer.createdAt).format("L"),
          };
        })
      );
    }
  };

  const deleteAll = async () => {
    Promise.all(selectedRowKeys.map((_id) => Customer.deleteCustomer(_id))).then(() => {
      setDate((_data) => [..._data.filter(({ _id }) => !selectedRowKeys.some((id) => _id == id))]);
      setSelectedRowKeys([]);

      toast.success("Successfully deleted");
    });
  };

  const columns = [
    {
      title: "Cust. Id",
      dataIndex: "index",
    },

    {
      title: "Join Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime());
      },
    },

    {
      title: "customer Name",
      dataIndex: "name",
      filters: filters.name,
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
      // sorter: (a, b) => alphabetIndex(String(a.name).charAt(0)),
      // sortDirections: ["descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: filters.email,
      onFilter: (value, record) => record.email.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      filters: filters.phone,
      onFilter: (value, record) => record.phone.startsWith(value),

      filterSearch: true,
    },
    {
      title: "Active Courses Counts",
      dataIndex: "courses",
      filters: filters.courses,
      onFilter: (value, record) => record.courses.startsWith(value),
      filterSearch: true,
    },

    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "DeActive",
          value: "deactive",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
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
              <Popconfirm title="Confirm Delete" onConfirm={deleteAll}>
                <button id="sbtndelete" disabled={selectedRowKeys.length < 1} style={{ float: "right" }}>
                  Delete
                </button>
              </Popconfirm>
              {/* <button id="cbtnedit" style={{ float: "right" }}>
                Edit
              </button> */}
              {/* <button id="cbtnactive" disabled={selectedRowKeys.length < 1} style={{ float: "right" }}>
                <h6 id="cicon" style={{ display: "inline", marginRight: "2px" }}>
                  <i class="bi bi-check2-square" style={{ color: "green" }}></i>
                </h6>
                Active
              </button> */}
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4">
        <PaginatedTable //
          columns={columns}
          setSelectedRowKeys={setSelectedRowKeys}
          selectedRowKeys={selectedRowKeys}
          data={data}
          pagination={false}
          loading={loading || OrdersLoading}
          total={total}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
        {/* <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} /> */}
      </div>
    </>
  );
};

export default Customers;
