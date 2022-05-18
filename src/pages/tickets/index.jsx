import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./ticketindex.scss";

import { Row, Col } from "react-bootstrap";
import { Table } from "antd";
import qs from "query-string";

import { Popconfirm } from "antd";
import { CustomPagination, Actions } from "../../components";
import { useEffect } from "react";
import Ticket from "../../services/ticket";
import moment from "moment";
import { toast } from "react-toastify";
import { alphabetIndex, DateTime, EmjsF, jsonValue, nullNumber } from "../../applocal";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import Courses from "../../services/courses";
import PaginatedTable from "../../components/PaginatedTable";
import filterState from "../components/filterState";
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

const Tickets = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 25);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(params.query || "");
  const [_statusfilters, set_statusfilters] = useState([
    {
      text: "",
      value: "",
    },
  ]);
  const [_departmentfilters, set_departmentfilters] = useState([]);
  const { user, userRl } = useSelector((s) => s.auth);
  const mgn = pmac(["admin", "manager", "marketing"]).includes(userRl);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { filters, _setFilter } = filterState({ date: [], course_name: [], name: [], phone: [], email: [] }, useState);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id,
      sortDirections: ["descend"],
    },

    {
      title: "Subject",
      dataIndex: "subject",
      sorter: (a, b) => alphabetIndex(String(a.subject).slice(0, 1)),
      sortDirections: ["descend"],
    },

    {
      title: "Name",
      dataIndex: "name",
      filters: filters.name,
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => alphabetIndex(String(a.name).slice(0, 1)),
      // sortDirections: ["descend"],
    },
    {
      title: "courses",
      dataIndex: "course",
      sorter: (a, b) => alphabetIndex(String(a.course).slice(0, 1)),
    },
    {
      title: "Assigned to",
      dataIndex: "assigned",
      filters: _departmentfilters,
      onFilter: (value, record) => record.assigned === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: _statusfilters,
      onFilter: (value, record) => record.status === value,
    },
    // {
    //   title: "Priority",
    //   onFilter: (value, record) => record.priority.indexOf(value) === 0,
    // },
    {
      title: "Ticket Date",
      dataIndex: "date",
      sorter: (a, b) => nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime()),
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
        window.location.replace("/#/replyTicket?data=" + jsonValue(item._id).toStringAll());
        // return <Redirect to={"newTicket?data=" + jsonValue(item).toStringAll()} />;
      }}
      deleteFun={() => deleteTicket(item._id)} /* updateFun={() => updateStaff(JSON.stringify(staff))}*/
    />
  );

  function getTickets() {
    props.history.push(`?page=${page}&pageSize=${pageSize}&query=${search}`);

    setLoading(true);
    const qs = (id, type) => {
      switch (type) {
        case "user":
          return Ticket.getMyTickets({ id, pageNo: page, pageSize, search });
        default:
          return Ticket.getPaginated(page, pageSize, search);
      }
    };

    qs(user.id, userRl)
      .then(({ data: { data: tickets = [] }, total }) => {
        setTotal(total);
        tickets.map((item, idx) =>
          Courses.getSingle(item.courseId)
            .then(
              ({
                data: {
                  data: { name, _id },
                },
              }) => {
                set_data(tickets, { [_id]: name });
                if (tickets.length == idx + 1) {
                  setLoading(false);
                }
              }
            )
            .catch(() => {
              if (tickets.length == idx + 1) {
                setLoading(false);
              }
            })
        );
        tickets.map((itm, index) => {
          _setFilter("name", { text: itm?.name, value: itm?.name });
        });
        if (!tickets?.length) {
          setLoading(false);
        }
        // Promise.all(tickets.map((item) => Ticket.delete(item._id))).then((data) => console.log(data));
        // setData(tickets.map((staff, index) => ({ ...staff, _id: index + 1 + data.length, assigned: "management", subject: staff.ticketDetails.subject, index: index + 1, actions: actions(staff), priority: "1", date: moment(staff.createdAt).format("L") })));
      })
      .catch(() => setLoading(false));
  }
  function set_data(items = [], obj = {}) {
    // console.log({ obj });
    const _s = {},
      _d = {};
    setData(
      items.map((item, index) => {
        _s[item?.status] = item?.status;
        _d[item?.department] = item?.department;
        return {
          ...item,
          id: index + 1 + data.length,
          assigned: item?.department,
          subject: item?.ticketDetails.subject,

          // course: obj[item?.courseId] || "",
          course: item?.ticketDetails?.courseName,
          index: index + 1,
          actions: actions(item),
          // priority: "1",
          date: moment(item.createdAt).format("L"),
          //
          // ...state,
          // _id: index + 1 + data.length,
          // assigned: state?.department,
          // subject: state.questionDetails.subject,
          // course: obj[state?.courseId] || "",
          // index: index + 1,
          // actions: actions(state),
          // date: moment(state.createdAt).format("L"),
          //
        };
      })
    );
    set_departmentfilters(EmjsF(_d).objList(({ key, value }) => ({ value, text: value })));
    set_statusfilters(EmjsF(_s).objList(({ key, value }) => ({ value, text: value })));
  }

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

  useEffect(() => {
    getTickets();
  }, []);

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
                  <button disabled={selectedRowKeys.length < 1} id="vbtndelete" style={{ float: "right" }}>
                    Delete
                  </button>
                </Popconfirm>
                {/*   <button id="vbtnedit" style={{ float: "right" }}>
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

export default Tickets;
