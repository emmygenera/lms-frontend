import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./orderindex.scss";

import { Table, Popconfirm } from "antd";
import { CustomPagination, Actions } from "../../components";
import qs from "query-string";
import OrderService from "../../services/orders";
import PaginatedTable from "../../components/PaginatedTable";
import { toast } from "react-toastify";
import moment from "moment";
import { Content } from "../../components/Content";
import reportAPI from "../../services/reportAPI";
import LoadingAnim from "../../components/LoadingAnim";
import { DateTime, nullNumber } from "../../applocal";
import orderService from "../../services/orders";
import { packageSrtingValue } from "../courses/component/Data.json";
import filterState from "../components/filterState";
import confirmDelete from "../functions/comfirmDelete";

const Orders = (props) => {
  const { data: dataParam, ...params } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  // console.log({ dataParam });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [dateFilters, setDateFilters] = useState([]);
  // const [nameFilters, setNameFilters] = useState([]);
  // const [statusFilters, setStatusFilters] = useState([]);
  // const [phoneFilters, setPhoneFilters] = useState([]);
  const [search, setSearch] = useState(params.query || "");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [ReportLoading, setReportLoading] = useState(false);
  const [Data, setData] = useState({});

  const { filters, _setFilter } = filterState({ date: [], course_name: [], name: [], phone: [], email: [] }, useState);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      sorter: (value, record) => record.id,
      sortDirections: ["descend"],
    },
    {
      title: "Order Date",
      dataIndex: "date",
      filters: filters.date,
      onFilter: (value, record) => record.date.includes(value),
      filterSearch: true,
      // sorter: (a, b) => nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime()),
      // sortDirections: ["descend"],
    },
    {
      title: "Courses_Name",
      dataIndex: "course_name",
      filters: filters.course_name,
      onFilter: (value, record) => record.course_name.includes(value),
      filterSearch: true,
      width: "60%",
    },
    {
      title: "Customer Name",
      width: "30%",
      dataIndex: "name",
      filters: filters.name,
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      filters: filters.phone,
      onFilter: (value, record) => record.phone.includes(value),
      filterSearch: true,
    },
    {
      title: "Email",
      width: "10%",
      dataIndex: "email",
      filters: filters.email,
      onFilter: (value, record) => record.email.includes(value),
      filterSearch: true,
    },

    // {
    //   title: "Order's Count",
    //   dataIndex: "order_count",
    //   sorter: (a, b) => b.order_count,
    //   sortDirections: ["descend"],
    // },
    {
      title: "Total",
      dataIndex: "total",
      sorter: (a, b) => b.total,
      sortDirections: ["descend"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  function getReports() {
    setReportLoading(true);
    reportAPI
      .getAll()
      .then(({ data: { data } }) => setData(data))
      .finally(() => setReportLoading(false));
  }

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  // useEffect(() => {
  //   getData();
  //   setPage(1);
  // }, [search]);

  const getData = () => {
    setLoading(true);
    const data_ = dataParam ? "&data=" + dataParam : "";
    props.history.push(`?pageNo=${page}&pageSize=${pageSize}&query=${(search, data_)}`);
    OrderService.getPaginated(page, pageSize, search || "")
      .then(({ data: { data: orders, total = 0 } }) => {
        //console.log({ orders });
        if (orders.length === 0 && page > 1) return setPage(page - 1);
        setTotal(total);
        if (dataParam) {
          orders = orders.filter((itm, index) => itm?._id == dataParam);
        }
        orders.map((itm, index) => {
          const course_name = itm?.courses?.flatMap((itm) => itm?.course?.name);
          _setFilter("course_name", { text: course_name, value: course_name });
          _setFilter("name", { text: itm?.name, value: itm?.name });
          _setFilter("date", { text: moment(itm?.createdAt).format("L"), value: moment(itm?.createdAt).format("L") });
          _setFilter("phone", { text: itm?.phone, value: itm?.phone });
          _setFilter("email", { text: itm?.email, value: itm?.email });
        });
        setDate(
          orders.map((order, index) => ({
            //
            ...order,
            course_name: order?.courses?.flatMap((itm) => (
              <p>
                {itm?.course?.name} <br /> <b>Duration: </b>
                {packageSrtingValue[itm?.coursePackage?.duration || ""]}
              </p>
            )),
            order_count: order?.courses?.length,
            actions: actions(order),
            id: index + 1,
            expire_in: moment(order.expireDate).format("L"),
            index: index + 1,
            date: moment(order.createdAt).format("L"),
          }))
        );
        // setDateFilters(instructors.map(({ createdAt }) => ({ value: moment(createdAt).format("L"), text: moment(createdAt).format("L") })));
        // setNameFilters(instructors.map(({ name }) => ({ value: name, text: name })));
        // setStatusFilters(instructors.map(({ status }) => ({ value: status, text: status })));
        // setPhoneFilters(instructors.map(({ phone }) => ({ value: phone, text: phone })));
      })
      .finally(() => setLoading(false));
  };

  const deleteCat = async (id) => {
    if (confirmDelete()) {
      setDate((_data) => {
        const newData = [..._data.filter(({ _id }) => _id !== id)];
        return newData;
      });
      toast.success("Successfully deleted");
      return await OrderService.deleteorder(id);
    }
  };

  // const updateCat = (data) => props.history.push(`/newInstructor?data=${JSON.stringify(data)}`);

  const actions = (category) => <Actions component={category} deleteFun={deleteCat} updateFun={null} />;
  function OrderItemStats({ icon, value, label }) {
    return (
      <div className="d-flex align-items-center">
        <div className="">{icon}</div>
        <div className="pl-2">
          <small className="d-block" style={{ color: "#999999" }}>
            {label}
          </small>
          <span className="d-block fw-bold">{value}</span>
        </div>
      </div>
    );
  }

  // console.log();
  const totalRevenue = Data?.revenue?.revenue,
    trending = Data?.course?.trending || [],
    totalUsers = Data?.user?.totalUsers,
    totalCourses = Data?.course?.courseCount,
    refundTicket = Data?.refund?.ticket,
    activeDailyUsers = Data?.activeUsersDaily,
    activeMonthlyUsers = Data?.user?.activeUsersMonthly,
    totalCustomer = Data?.user?.monthly,
    userActivePercent = Math.ceil((activeDailyUsers / totalUsers) * 100);

  // if (ReportLoading) {
  //   return <LoadingAnim />;
  // }
  const deleteAll = () => {
    if (confirmDelete()) {
      setLoading(true);
      return new Promise((resolve, reject) =>
        Promise.all(selectedRowKeys.map(async (id) => await orderService.deleteorder(id))).then(() => {
          getData();
          resolve("");
          setSelectedRowKeys([]);
          toast.success("Successfully deleted");
        })
      );
    }
  };
  return (
    <>
      <div className=" row" style={{ paddingTop: "50px" }}>
        <div className="mt-5. col-sm-3  align-items-center">
          <Link className="d-inline-flex linkbtn rad_10" to="newOrder" style={{ backgroundColor: "#F1F1F1" }}>
            <i class="ps-2 bi bi-stack"></i>
            <p className="ps-2">Add Manual Oder</p>
          </Link>
        </div>
        <div className="col-sm-9">
          <Content paddingNone>
            {ReportLoading ? (
              <LoadingAnim padding="10px 0 0 0" />
            ) : (
              <div className="row align-items-center">
                <div className="col-4 ">
                  <p className="px-3">Orders At a Glance</p>
                </div>

                <div className="col-2">
                  <OrderItemStats
                    icon={
                      <svg width="22" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="3.54545" height="26" rx="1.77273" transform="matrix(-1 0 0 1 24.8181 0)" fill="#0E7009" />
                        <rect width="3.54545" height="18.9091" rx="1.77273" transform="matrix(-1 0 0 1 17.7271 7.09082)" fill="#0E7009" />
                        <rect width="3.54545" height="8.27273" rx="1.77273" transform="matrix(-1 0 0 1 10.6362 17.7271)" fill="#0E7009" />
                        <rect width="4" height="16" rx="2" transform="matrix(-1 0 0 1 4 10)" fill="#0E7009" />
                      </svg>
                    }
                    value={totalRevenue}
                    label={"Income"}
                  />
                </div>
                <div className="col-2">
                  <OrderItemStats
                    icon={
                      <svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M29.3124 0.990819C30.1459 1.71561 30.234 2.97887 29.5092 3.81239L20.7578 13.8765C19.359 15.4851 16.9444 15.7141 15.2681 14.397L11.1176 11.1359L3.87074 17.9564C3.06639 18.7135 1.80064 18.6751 1.04361 17.8708C0.286573 17.0664 0.324929 15.8007 1.12928 15.0436L8.3761 8.22309C9.817 6.86695 12.0329 6.76812 13.5888 7.99062L17.7394 11.2518L26.4908 1.18767C27.2156 0.354158 28.4788 0.266024 29.3124 0.990819Z"
                          fill="#0E7009"
                        />
                      </svg>
                    }
                    value={totalUsers}
                    label={"Customers"}
                  />
                </div>
                <div className="col-2">
                  <OrderItemStats
                    icon={
                      <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14.9999 0.686289C13.7205 0.233951 12.3682 0 10.9999 0V3.93696C12.4442 3.93696 13.8619 4.32489 15.105 5.06021C16.3481 5.79553 17.3708 6.85124 18.0664 8.117C18.7619 9.38277 19.1047 10.8121 19.0589 12.2557C19.0131 13.6992 18.5804 15.104 17.806 16.3231C17.0317 17.5422 15.9441 18.531 14.6569 19.186C13.3697 19.8411 11.9302 20.1384 10.4888 20.0468C9.04748 19.9553 7.65715 19.4783 6.46319 18.6656C5.26922 17.853 4.31544 16.7346 3.70154 15.4273L0.137939 17.1007C0.719545 18.3393 1.50612 19.4639 2.45939 20.4297C3.00364 20.9811 3.60223 21.4807 4.24803 21.9203C6.02498 23.1297 8.09416 23.8396 10.2393 23.9759C12.3845 24.1121 14.5268 23.6697 16.4425 22.6948C18.3582 21.7199 19.9768 20.2483 21.1293 18.4339C22.2818 16.6195 22.9257 14.5289 22.9939 12.3805C23.062 10.2321 22.5519 8.10484 21.5167 6.22104C20.4816 4.33724 18.9595 2.76605 17.1094 1.6717C16.4371 1.27398 15.7304 0.944541 14.9999 0.686289Z"
                          fill="#0E7009"
                        />
                      </svg>
                    }
                    value={userActivePercent + "%"}
                    label={"Than last week"}
                  />
                </div>
                <div className="col-2">
                  <div>
                    <Popconfirm title="Confirm Delete" onConfirm={deleteAll}>
                      <button id="qbtndelete" style={{ float: "right" }} disabled={selectedRowKeys.length === 0}>
                        Delete
                      </button>
                    </Popconfirm>
                    {/* <button className="btn btn-default">
                      <span className="pr-2">This Week</span>
                      <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 -5.24537e-07L6 6L12 0" fill="#0E7009" />
                      </svg>
                    </button> */}
                  </div>
                </div>
              </div>
            )}
          </Content>
        </div>
      </div>

      <div className="mt-3 p-4" style={{ backgroundColor: "white" }}>
        <PaginatedTable total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} columns={columns} loading={loading} data={data} setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} />
      </div>
    </>
  );
};

export default Orders;
