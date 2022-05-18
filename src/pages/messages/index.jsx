import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./ticketindex.scss";

import { Row, Col } from "react-bootstrap";
import { Popconfirm, Table } from "antd";
import qs from "query-string";

import { CustomPagination, Actions } from "../../components";
import { useEffect } from "react";
import Ticket from "../../services/MessageAPI";
import moment from "moment";
import { toast } from "react-toastify";
import { arrayObjectMerge, DateTime, jsonValue, nullNumber } from "../../applocal";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import APP_USER from "../../services/APP_USER";
import PaginatedTable from "../../components/PaginatedTable";
import confirmDelete from "../functions/comfirmDelete";

// const data = [
//   {
//     key: "1",
//     id: 1,
//     join_date: 5,
//     name: "John Brown",
//     course: "The mern satck",
//     status: "Active",
//     assigned: "123",
//     priority: "High",
//     action: <Actions />,
//   },
// ];

const Message = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 25);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [search, setSearch] = useState(params.query || "");

  const [filters, setFilters] = useState({
    user_type: [],
    name: [],
    status: [],
  });
  function _setFilter(key = filters, value = {}) {
    setFilters((s) => ({ ...s, [key]: arrayObjectMerge(s[key], [value], "value") }));
  }

  const { user, userRl } = useSelector((s) => s.auth);
  const mgn = pmac(["admin", "manager"]).includes(userRl);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id,
      sortDirections: ["descend"],
    },
    {
      title: "Creation Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime());
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      filters: filters.name,
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: filters.status,
      onFilter: (value, record) => record.status.includes(value),
      filterSearch: true,
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      filters: filters.user_type,
      onFilter: (value, record) => record.user_type.includes(value),
      filterSearch: true,
    },

    { title: "Action", dataIndex: "actions" },
  ];

  const deleteTicket = async (id) => {
    if (confirmDelete()) {
      return await Ticket.delete(id).then(() => {
        toast.success("Successfully deleted");
        setData((_data) => {
          const newData = [..._data.filter(({ _id }) => _id !== id)];
          return newData;
        });
      });
    }
  };

  //const updateStaff = (staff) => props.history.push(`/newStaff?data=${staff}`);

  const actions = (item) => (
    <Actions
      showDel={mgn}
      showUpd={mgn}
      component={item}
      onView={() => {
        // console.log(item);
        window.location.replace("/#/replyMessage?data=" + jsonValue(item._id).toStringAll());
        // return <Redirect to={"newTicket?data=" + jsonValue(item).toStringAll()} />;
      }}
      deleteFun={() => deleteTicket(item._id)} /* updateFun={() => updateStaff(JSON.stringify(staff))}*/
    />
  );

  function getMessages() {
    props.history.push(`?page=${page}&pageSize=${pageSize}&query=${search}`);

    setLoading(true);
    const qs = (id, type) => {
      switch (type) {
        case APP_USER.instructor:
          return Ticket.getInstructorMessage({ id, pageNo: page, pageSize, search });
        case APP_USER.customer:
          return Ticket.getMyMessage({ id, pageNo: page, pageSize, search });
        default:
          return Ticket.getPaginated(page, pageSize, search);
      }
    };

    qs(user.id, userRl)
      .then(({ data: { data: tickets = [] }, total }) => {
        //  console.log(total);
        setTotal(total);
        tickets.map((itm, index) => {
          _setFilter("name", { text: itm?.subject, value: itm?.subject });
          _setFilter("status", { text: itm?.status, value: itm?.status });
          _setFilter("user_type", { text: itm?.ticketDetails?.user_type, value: itm?.ticketDetails?.user_type });
        });

        // Promise.all(tickets.map((item) => Ticket.delete(item._id))).then((data) => console.log(data));
        setData(
          tickets.map((staff, index) => ({
            ...staff,
            id: index + 1 + data.length,
            // _id: index + 1 + data.length,
            assigned: "management",
            name: staff?.subject,
            user_type: staff.ticketDetails.user_type,
            subject: staff.ticketDetails.subject,
            index: index + 1,
            actions: actions(staff),
            priority: "1",
            date: moment(staff.createdAt).format("L"),
          }))
        );
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    getMessages();
  }, []);

  const deleteAll = () => {
    if (confirmDelete()) {
      toast.info("Deleting...");
      Promise.all(selectedRowKeys.map((id) => Ticket.delete(id))).then(() => {
        setData((_data) => [..._data.filter(({ _id }) => !selectedRowKeys.some((id) => _id == id))]);
        setSelectedRowKeys([]);
        toast.success("Successfully deleted...");
      });
    }
  };
  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        <Col sm={3}>
          {/* <Link className="d-inline-flex tlinkbtn" to="/newTicket" style={{ backgroundColor: "#F1F1F1" }}>
            <p className=" px-3 py-md-2 px-md-4">+New Ticket</p>
          </Link> */}
        </Col>
        <Col sm={9} className="shadow-sm col2 mt-1 bg-white" style={{ borderRadius: "1em" }}>
          <Row className="py-md-2 align-items-center">
            <Col sm={7} md={8} className="hidediv " style={{ position: "relative" }}>
              <div className=" d-flex align-items-center">
                <i class="bi bi-person tsearchicon"></i>
                <div className="col-7 p-relative">
                  <input id="tsearchinput" className="p-2 pl-3 w-100" type="search" placeholder="Search here" />
                  <i className="bi bi-search p-1. p-absolute" style={{ top: "30%", right: 10 }}></i>
                </div>
              </div>
            </Col>
            {mgn && (
              <Col sm={5} md={4}>
                <Popconfirm title="Confirm Delete" onConfirm={deleteAll}>
                  <button id="vbtndelete" disabled={selectedRowKeys.length < 1} style={{ float: "right" }}>
                    Delete
                  </button>
                </Popconfirm>
                {/* <button id="vbtnedit" style={{ float: "right" }}>
                  Edit
                </button> */}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4" style={{ backgroundColor: "white" }}>
        {/* {loading ? "Loading data..." : ""} */}
        <PaginatedTable
          //
          loading={loading}
          columns={columns}
          data={data}
          page={page}
          setPage={setPage}
          total={total}
          pageSize={pageSize}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setPageSize={setPageSize}
        />
        {/* <Table columns={columns} dataSource={data} pagination={false} loading={loading} /> */}
        {/* <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} /> */}
      </div>
    </>
  );
};

export default Message;
