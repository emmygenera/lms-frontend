import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./orderindex.scss";


import { Table } from "antd";
import { CustomPagination, Actions } from "../../components";
import qs from "query-string";
import OrderService from "../../services/orders";
import PaginatedTable from "../../components/PaginatedTable";
import { toast } from "react-toastify";
import moment from "moment";
const columns = [
  {
    title: "Order ID",
    dataIndex: "id",
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: "30%",
  },
  {
    title: "Date",
    dataIndex: "join_date",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Course Name",
    dataIndex: "name",

    width: "40%",
  },
  {
    title: "Customer Name",
    dataIndex: ["createdBy", 'email'],

    width: "40%",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
  {
    title: "Email",
    dataIndex: "email",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
  {
    title: "Expire In",
    dataIndex: "expire_in",

    width: "40%",
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const data = [
  {
    id: "#0012451",
    date: "04/08/2020",
    name: "Live Trading",
    customer_name: "Bella Simatupang",
    phone: "London, US",
    email: "2 pics",
    expire: "30 days left",
    status: "Paid",
    total: "$100",
    actions: <Actions />,
  },
];

const Orders = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dateFilters, setDateFilters] = useState([]);
  const [nameFilters, setNameFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [phoneFilters, setPhoneFilters] = useState([]);
  const [search, setSearch] = useState(params.query || "");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  useEffect(() => {
    getData();
    setPage(1);
  }, [search]);

  const getData = () => {
    setLoading(true);
    props.history.push(`?page=${page}&pageSize=${pageSize}&query=${search}`);
    OrderService.getPaginated(page, pageSize, search || "")
      .then(({ data: { orders, total } }) => {
        console.log({ orders })
        if (orders.length === 0 && page > 1) return setPage(page - 1);
        setTotal(total);
        setDate(orders.map((order, index) => ({ ...order, actions: actions(order), id: index + 1, expire_in: moment(order.expireDate).format("L"), index: index + 1, join_date: moment(order.createdAt).format("L") })));
        // setDateFilters(instructors.map(({ createdAt }) => ({ value: moment(createdAt).format("L"), text: moment(createdAt).format("L") })));
        // setNameFilters(instructors.map(({ name }) => ({ value: name, text: name })));
        // setStatusFilters(instructors.map(({ status }) => ({ value: status, text: status })));
        // setPhoneFilters(instructors.map(({ phone }) => ({ value: phone, text: phone })));
      })
      .finally(() => setLoading(false));
  };

  const deleteCat = async (id) => {
    setDate((_data) => {
      const newData = [..._data.filter(({ _id }) => _id !== id)];
      return newData;
    });
    toast.success("Successfully deleted");
    return await OrderService.deleteorder(id);
  };

  // const updateCat = (data) => props.history.push(`/newInstructor?data=${JSON.stringify(data)}`);

  const actions = (category) => <Actions component={category} deleteFun={deleteCat} updateFun={null} />;

  return (
    <>
      <div className=" row" style={{ paddingTop: "50px" }}>
        <div className="mt-5 col-sm-3 ">
          <Link className="d-inline-flex linkbtn" to="newOrder" style={{ backgroundColor: "#F1F1F1" }}>
            <i class="ps-2 bi bi-stack"></i>
            <p className="ps-2">Add Manual Oder</p>
          </Link>
        </div>
        <div className="col-sm-8"></div>
      </div>

      <div className="mt-3 p-4" style={{ backgroundColor: "white" }}>
        <PaginatedTable
          total={total}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          columns={columns}
          loading={loading}
          data={data}
          setSelectedRowKeys={setSelectedRowKeys}
          selectedRowKeys={selectedRowKeys}
        />
      </div>
    </>
  );
};

export default Orders;
