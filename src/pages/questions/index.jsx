import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./questionindex.scss";

import { Row, Col } from "react-bootstrap";
import { Table, Popconfirm } from "antd";
import qs from "query-string";

import { CustomPagination, Actions } from "../../components";
import { useEffect } from "react";
import Question from "../../services/question";
import moment from "moment";
import { toast } from "react-toastify";
import { alphabetIndex, alphabetIndexSum, arrayObjectMerge, DateTime, EmjsF, jsonValue, nullNumber } from "../../applocal";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import Courses from "../../services/courses";
import APP_USER from "../../services/APP_USER";
import PaginatedTable from "../../components/PaginatedTable";
import filterState from "../components/filterState";
/* 
const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    sorter: (a, b) => a._id,
    sortDirections: ["descend"],
  },

  {
    title: "Name",
    dataIndex: "name",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.questionDetails.subject.length,
    sortDirections: ["descend"],
  },
  {
    title: "Subject",
    dataIndex: "subject",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.questionDetails.subject.length,
    sortDirections: ["descend"],
  },
  {
    title: "courses",
    dataIndex: "course",
    // filters: [],
    onFilter: (value, record) => record.course.indexOf(value) === 0,
  },
  // {
  //   title: "Assigned to",
  //   dataIndex: "assigned",
  //   // filters: [],
  //   onFilter: (value, record) => record.assigned.indexOf(value) === 0,
  // },
  {
    title: "Status",
    dataIndex: "status",
  },
  // {
  //   title: "Priority",
  //   dataIndex: "priority",
  //   filters: [
  //     {
  //       text: "Active",
  //       value: "Active",
  //     },
  //     {
  //       text: "Active",
  //       value: "Active",
  //     },
  //   ],
  //   onFilter: (value, record) => record.priority.indexOf(value) === 0,
  // },
  {
    title: "Question Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "actions",
  },
];
*/
const Questions = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 25);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [courseFetching, setCourseFetching] = useState(true);
  const [data, setData] = useState([]);
  const [_statusfilters, set_statusfilters] = useState([
    {
      text: "",
      value: "",
    },
  ]);

  const { filters, _setFilter } = filterState({ user_type: [] }, useState);

  const [search, setSearch] = useState(params.query || "");
  const { user, userRl } = useSelector((s) => s.auth);
  const mgn = pmac(["admin", "manager", "marketing"]).includes(userRl);

  const deleteQuestion = async (id) => {
    return await Question.delete(id).then(() => {
      toast.success("Successfully deleted");
      setData((_data) => {
        const newData = [..._data.filter(({ _id }) => _id !== id)];
        return newData;
      });
    });
  };

  //const updateStaff = (staff) => props.history.push(`/newStaff?data=${staff}`);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a._id,
      sortDirections: ["descend"],
    },

    {
      title: "Name",
      dataIndex: "name",
      // sorter: (a, b) => alphabetIndexSum(a?.name?.charAt(0)),
      filters: filters.name,
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
      // sortDirections: ["descend"],
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sorter: (a, b) => alphabetIndex(String(a.subject).slice(0, 1)),
      // sortDirections: ["descend"],
    },
    {
      title: "courses",
      dataIndex: "course",
      sorter: (a, b) => alphabetIndex(String(a.course).slice(0, 1)),
    },
    // {
    //   title: "Assigned to",
    //   dataIndex: "assigned",
    //   // filters: [],
    //   onFilter: (value, record) => record.assigned.indexOf(value) === 0,
    // },
    {
      title: "Status",
      dataIndex: "status",
      filters: _statusfilters,
      onFilter: (value, record) => record.status == value,
    },
    // {
    //   title: "Priority",
    //   dataIndex: "priority",
    //   filters: [
    //     {
    //       text: "Active",
    //       value: "Active",
    //     },
    //     {
    //       text: "Active",
    //       value: "Active",
    //     },
    //   ],
    //   onFilter: (value, record) => record.priority.indexOf(value) === 0,
    // },
    {
      title: "Question Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return nullNumber(String(b.join_date).replace("/"), DateTime(b.date).getTime());
      },
    },
    {
      title: "Action",
      dataIndex: "actions",
    },
  ];
  const actions = (item) => (
    <Actions
      showDel={mgn}
      showUpd={mgn}
      component={item}
      onView={() => {
        // console.log(item);
        window.location.replace("/#/replyQuestion?data=" + jsonValue(item._id).toStringAll());
        // return <Redirect to={"newQuestion?data=" + jsonValue(item).toStringAll()} />;
      }}
      deleteFun={() => deleteQuestion(item._id)} /* updateFun={() => updateStaff(JSON.stringify(staff))}*/
    />
  );

  function getQuestions() {
    props.history.push(`?page=${page}&pageSize=${pageSize}&query=${search}`);

    setLoading(true);
    const qs = (id, type) => {
      switch (type) {
        case APP_USER.customer:
          return Question.getMyQuestion({ id, pageNo: page, pageSize, search });
        case APP_USER.instructor:
          return Question.getInstructorQuestion({ id, pageNo: page, pageSize, search });
        default:
          return Question.getPaginated(page, pageSize, search);
      }
    };

    qs(user.id, userRl)
      .then(({ data: { data: questions = [] }, total }) => {
        // console.log(questions);
        setTotal(total);

        questions.map((itm, index) => {
          _setFilter("name", { text: itm?.questionDetails?.name, value: itm?.questionDetails?.name });
        });
        const obj = {};
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        questions.map((item, idx) =>
          Courses.getSingle(item.courseId)
            .then(
              ({
                data: {
                  data: { name, _id },
                },
              }) => {
                set_data(questions, { [_id]: name });
                if (questions.length == idx + 1) {
                  setCourseFetching(false);
                }
              }
            )
            .catch(() => {
              if (questions.length == idx + 1) {
                setCourseFetching(false);
              }
            })
        );
        // Promise.all(questions.map((item) => Courses.getSingle(item.courseId)))
        //   .then((data) => {
        //     setCourseFetching(true);
        //     data.map(
        //       ({
        //         data: {
        //           data: { name, _id },
        //         },
        //       }) => (obj[_id] = name)
        //     );

        //     console.log({ data });
        //     set_data(questions, obj);
        //   })
        //   .finally(() => setCourseFetching(false))
        //   .catch((data) => {
        //     set_data(questions);
        //   });
      })
      .finally(() => setLoading(false));
  }
  function set_data(questions = [], obj = {}) {
    // console.log({ obj });
    const _d = {};
    setData(
      questions.map((state, index) => {
        _d[state?.status] = state?.status;
        return {
          ...state,
          id: index + 1 + data.length,
          // assigned: "management",
          name: state?.questionDetails?.name,
          subject: state.questionDetails.subject,
          course: obj[state?.courseId] || "",
          index: index + 1,
          actions: actions(state),
          date: moment(state?.createdAt).format("L"),
          //
        };
      })
    );

    set_statusfilters(EmjsF(_d).objList(({ key, value }) => ({ value, text: value })));
  }

  const deleteAll = () => {
    toast.info("Deleting...");
    Promise.all(selectedRowKeys.map((id) => Question.delete(id))).then(() => {
      setData((_data) => [..._data.filter(({ _id }) => !selectedRowKeys.some((id) => _id == id))]);
      setSelectedRowKeys([]);
      toast.success("Successfully deleted...");
    });
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        <Col sm={3}>
          {/* <Link className="d-inline-flex tlinkbtn" to="/newQuestion" style={{ backgroundColor: "#F1F1F1" }}>
            <p className=" px-3 py-md-2 px-md-4">+New Question</p>
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
        {/* <Table loading={loading || courseFetching} columns={columns} dataSource={data} pagination={false} />
        <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} /> */}
      </div>
    </>
  );
};

export default Questions;
