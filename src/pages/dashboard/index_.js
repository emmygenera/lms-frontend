import React, { useEffect, useState } from "react";
import { baseUrl } from "../../applocal";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import "../courses/user/page6/page6.scss";
import Question from "../../services/question";
import moment from "moment";
import LoadingAnim from "../../components/LoadingAnim";
import Ticket from "../../services/ticket";

const { Paragraph } = Typography;

function Welcome({}) {
  return (
    <div className="bg-silver p-3 rad_5 row">
      <div className="col-sm-8">
        <h3 style={{ color: "#2b9035" }} className="fz-2 font-weight-bold">
          Welcome to EzeeTrader!
        </h3>
        <p>
          Copyright (C) Microsoft Corporation. All rights reserved. Try the new cross-platform PowerShell Copyright (C) Microsoft Corporation. All rights reserved. Try the new cross-platform PowerShell Copyright (C) Microsoft Corporation. All rights reserved. Try the new cross-platform PowerShell
        </p>
        <div>
          <a href="#" className="btn btn-danger rad_5 .p-3 mr-3">
            Learn More &nbsp;&nbsp;&rarr;
          </a>
          <a href="#" className="p-2" style={{ textDecoration: "underline", color: "#2b9035" }}>
            Remind me later
          </a>
        </div>
      </div>
      <div className="col-sm-4">
        <img src={baseUrl("logo.png")} className="w-100 p-relative" style={{ bottom: 25 }} />
      </div>
    </div>
  );
}
function VProgressBar({
  bottom = 0,
  height = 100,
  data = [
    { sn: 10, pt: 10 },
    { sn: 11, pt: 50 },
    { sn: 12, pt: 40 },
    { sn: 13, pt: 80 },
    { sn: 14, pt: 30 },
    { sn: 15, pt: 50 },
    { sn: 16, pt: 60 },
    { sn: 17, pt: 70 },
    { sn: 18, pt: 80 },
    { sn: 18, pt: 80 },
    { sn: 19, pt: 90 },
    { sn: 20, pt: 19 },
    { sn: 21, pt: 60 },
    { sn: 22, pt: 20 },
    { sn: 23, pt: 4 },
  ],
}) {
  return (
    <div className="py-4 p-relative d-flex">
      {data.map(({ sn, pt }, idx) => (
        <div key={idx} className="progress progress-bar-vertical" style={{ minHeight: height }}>
          <span className="p-absolute " style={{ bottom: bottom }}>
            {sn}
          </span>
          <div class="progress-bar progress-striped-c" role="progressbar" aria-valuenow={pt} aria-valuemin="0" aria-valuemax="100" style={{ height: pt + "%" }}></div>
        </div>
      ))}
    </div>
  );
}
function Stats({}) {
  return (
    <div className="bg-white outline-shadow p-4 mt-4">
      <div className="row">
        <div className="col-sm-6">
          <div className="font-weight-bold">
            <strong className="font-weight-bold fz-5 pr-1">150</strong>
            <strong>Courses</strong>
          </div>
          <div>
            <p>Courses sold today</p>
            <div className="p-3"></div>
            <div className="row p-relative">
              <div className="col-6 pl-0">
                <a href="#" className="py-2" style={{ textDecoration: "underline", color: "#2b9035" }}>
                  View more &rarr;
                </a>
              </div>
              <div className="col-6 p-absolute p-right-0" style={{ bottom: 0 }}>
                <span className="d-flex justify-content-end">
                  <svg width="90" height="58" viewBox="0 0 90 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5602 37.6458C12.8885 44.6715 5.59527 52.3964 2.71924 55.7162H87.463V2L63.6386 31.9333C58.8469 37.9536 50.3729 39.832 43.3921 36.4211L38.8917 34.2222C32.3854 31.0432 24.5082 32.4352 19.5602 37.6458Z" fill="url(#paint0_linear_0_1)" />
                    <path d="M2.71924 55.7162C5.59527 52.3964 12.8885 44.6715 19.5602 37.6458C24.5082 32.4352 32.3854 31.0432 38.8917 34.2222L43.3921 36.4211C50.3729 39.832 58.8469 37.9536 63.6386 31.9333L87.463 2" stroke="#377F33" stroke-width="4" stroke-linecap="round" />
                    <defs>
                      <linearGradient id="paint0_linear_0_1" x1="45.0911" y1="8.71453" x2="48.3726" y2="55.727" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#2130B8" stop-opacity="0.3" />
                        <stop offset="1" stop-color="#2130B8" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <h4 className="text-right fz-sm m-0">
                  <strong>+14%</strong>
                </h4>
                <p className="text-right">
                  <small>than last week</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <VProgressBar />
        </div>
      </div>
    </div>
  );
}
function FontAwesomeArrowDown({ size: width = 5 }) {
  return (
    <svg style={{ width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path d="M9.375 329.4c12.51-12.51 32.76-12.49 45.25 0L128 402.8V32c0-17.69 14.31-32 32-32s32 14.31 32 32v370.8l73.38-73.38c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-128 128c-12.5 12.5-32.75 12.5-45.25 0l-128-128C-3.125 362.1-3.125 341.9 9.375 329.4z" />
    </svg>
  );
}
function LinkDown({ onClick, href }) {
  return (
    <div className="d-flex justify-content-center w-100">
      <a className="btn p-2 rad_all px-3 shadow" href={href} onClick={onClick}>
        <FontAwesomeArrowDown size={10} />
      </a>
    </div>
  );
}

function Orders({}) {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]); // Check here to configure the default column;

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Customer Name	",
      dataIndex: "customer_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      order_id: `Order ID	 King ${i}`,
      date: `Date King ${i}`,
      customer_name: `Customer Name	 King ${i}`,
      email: "Email",
      phone: `${Math.random(i) * 10000000}`,
      action: (
        <button className="btn btn-sm fz-1">
          <strong>View</strong>
        </button>
      ),
    });
  }

  const onSelectChange = (selectedRowKeys_) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys_);
    setSelectedRowKeys(selectedRowKeys_);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className="bg-white cs-table-style outline-shadow p-4 mt-4">
      <Table className="mb-4" columns={columns} dataSource={data} pagination={false} rowSelection={false} />
      <LinkDown />
    </div>
  );
}

function List({ title = "", subject = "", status = "Open", mode = "success" }) {
  return (
    <div className="row">
      <div className="col-8 p-0">
        <h4 className="fz-sm m-0" style={{ fontWeight: 600 }}>
          {title}
        </h4>
        <Paragraph ellipsis={{ rows: 2, symbol: " " }} className="fz-sm">
          {subject}
        </Paragraph>
        {/* <p className="fz-sm m-0">{subject}</p> */}
      </div>
      <div className="col-4 p-0 text-right">
        <button type="button" className={`btn btn-default fz-sm text-left text-${mode}`} style={{ fontWeight: 600 }}>
          {status}
        </button>
      </div>
      <div className="divider" />
    </div>
  );
}
function ListItem({ loading, data = [], title = "", onClick, renderItems: RenderItems }) {
  return (
    <div className="bg-white cs-table-style outline-shadow p-3">
      <div className="row align-items-center">
        <div className="col-8 p-0">
          <p className="fz-1-5 m-0 font-bold">{title}</p>
        </div>
        <div className="col-4 p-0 text-right">
          <button type="button" onClick={onClick} className="btn btn-default fa fa-opt">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" style={{ width: 4 }}>
              <path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z" />
            </svg>
          </button>
        </div>
        <div className="divider border-0" />
      </div>
      <div>
        {loading && <LoadingAnim />}
        {data.map((item, idx) => {
          return <RenderItems key={idx} data={item} />;
        })}
        {/* <List title="Samer turk" subject="Can't access my dashboard" status="Open" /> */}
      </div>
      <LinkDown />
    </div>
  );
}

function MessageTicket({ message = { loading: false, data: [] }, ticket = { loading: false, data: [] } }) {
  return (
    <div className="row mt-4">
      <div className="col-sm-6 pl-0">
        <ListItem
          title="Latest Messages"
          data={[
            { title: "Samer turk", subject: "Can't access my dashboard", status: "Open", mode: "success" },
            { title: "Kelvin Hart", subject: "Can't access my dashboard", status: "Replied", mode: "danger" },
            { title: "Jonny Jose", subject: "Can't access my dashboard", status: "Open", mode: "success" },
            { title: "Luckas John", subject: "Can't access my dashboard", status: "Replied", mode: "danger" },
          ]}
          renderItems={({ data }) => <List {...data} />}
        />
      </div>
      <div className="col-sm-6 pr-0">
        <ListItem loading={ticket.loading} title="Latest Tickets" data={ticket.data} renderItems={({ data }) => <List {...data} />} />
      </div>
    </div>
  );
}
function CustomerMessageTicket({ msg = false, question = { loading: false, data: [] }, message = { loading: false, data: [] }, ticket = { loading: false, data: [] } }) {
  return (
    <div className="row mt-4">
      <div className="col-sm-6 pl-0">
        {mgn ? (
          <ListItem
            title="My Messages"
            data={[
              { title: "Samer turk", subject: "Can't access my dashboard", status: "Open", mode: "success" },
              { title: "Kelvin Hart", subject: "Can't access my dashboard", status: "Replied", mode: "danger" },
              { title: "Jonny Jose", subject: "Can't access my dashboard", status: "Open", mode: "success" },
              { title: "Luckas John", subject: "Can't access my dashboard", status: "Replied", mode: "danger" },
            ]}
            renderItems={({ data }) => <List {...data} />}
          />
        ) : (
          <ListItem
            //
            loading={question.loading}
            title="My Questions"
            data={question.data}
            renderItems={({ data }) => <List {...data} />}
          />
        )}
      </div>
      <div className="col-sm-6 pr-0">
        <ListItem
          title="My Tickets"
          data={[
            { title: "Samer turk", subject: "Can't access my dashboard", status: "Open", mode: "success" },
            { title: "Kelvin Hart", subject: "Can't access my dashboard", status: "Waiting for customer reply", mode: "danger" },
            { title: "Jonny Jose", subject: "Can't access my dashboard", status: "Open", mode: "success" },
            { title: "Luckas John", subject: "Can't access my dashboard", status: "Onhold", mode: "warning" },
          ]}
          renderItems={({ data }) => <List {...data} />}
        />
      </div>
    </div>
  );
}

// atob();
// btoa();
export default function Dashboard() {
  const { userRl, user, userRlId } = useSelector((state) => state.auth);
  const [questionsData, setQuestionsData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);

  //  const [Data, setData] = useState({
  //   questions: [],
  //   messages: [],
  //   tickets: [],
  // });
  const [loading, setLoading] = useState({
    question: false,
    message: false,
    ticket: false,
  });

  const isDashboardVisible = pmac(["admin", "manager"]).includes(userRl);
  const pageSize = 4;
  function setLoading_(data = loading) {
    setLoading({ ...loading, ...data });
  }
  function getQuestions() {
    setLoading_({ question: true });
    const qs = (id, type) => {
      switch (type) {
        case "user":
          return Question.getMyQuestion({ id, pageSize });
        default:
          return Question.getPaginated(1, pageSize);
      }
    };

    qs(user.id, userRl)
      .then(({ data: { data: questions = [] } }) => {
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        setQuestionsData(
          questions.map((state, index) => {
            const md = { open: "success", closed: "danger", active: "primary" };
            const mode = md[String(state.status).toLowerCase()] || "info";

            return { ...state, title: "Customer", subject: state.questionDetails.subject, mode };
          })
        );
      })
      .finally(() => setLoading_({ question: false }));
  }
  function getTickets() {
    setLoading_({ ticket: true });
    const qs = (id, type) => {
      switch (type) {
        case "user":
          return Ticket.getMyTickets({ id, pageSize });
        default:
          return Ticket.getPaginated(1, pageSize);
      }
    };

    qs(user.id, userRl)
      .then(({ data: { data: tickets = [] } }) => {
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        setTicketsData(
          tickets.map((state, index) => {
            const md = { open: "success", closed: "danger", active: "primary" };
            const mode = md[String(state.status).toLowerCase()] || "info";

            return { ...state, title: "Customer", subject: state?.ticketDetails?.subject, mode };
          })
        );
      })
      .finally(() => setLoading_({ ticket: false }));
  }
  useEffect(() => {
    getQuestions();
  }, []);
  useEffect(() => {
    getTickets();
  }, []);
  console.log(ticketsData);
  return (
    <div className="pt-5">
      <div className="row mt-5">
        <div className="col-sm-9">
          <Welcome />
          {isDashboardVisible ? (
            <>
              <Stats />
              <Orders />
              <MessageTicket message={{ loading: loading.message, data: messagesData }} ticket={{ loading: loading.ticket, data: ticketsData }} />
            </>
          ) : (
            <>
              <CoursePending />
              <CustomerMessageTicket />
            </>
          )}
        </div>
        <div className="col-sm-3">
          {isDashboardVisible ? (
            <>
              <ListItem loading={loading.question} title="Latest Questions" data={questionsData} renderItems={({ data }) => <List {...data} />} />
              <div className="mt-4">
                <Link to="/newCourse" className="btn btn-dark btn-block shadow rad_5 w-100 p-3">
                  + Quick Add
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="">
                <EnrolledCourses />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function EnrolledCourses({ title = "Enrolled Courses", data }) {
  function EnrolledCourseProgress({ lessonCompleted = 0, title, lessonTotal = 0, progress = 0, dayString, dayInt, status = true }) {
    const color = status ? "#21b830" : "#000";
    const color2 = status ? "#21b830" : "#fff";
    return (
      <div className="d-flex align-items-center py-3">
        <div className="">
          <div className="avatar d-flex justify-content-center align-items-center flex-column p-relative text-center  .p-3" style={{ width: 70, height: 75, backgroundColor: status ? "white" : "#ebedff", border: "1px solid " + color2, borderRadius: 20 }}>
            <span className="d-block fz-3 fw-bold">{dayInt}</span>
            <span className="d-block fz-1">{dayString}</span>
            <span className="p-absolute d-inline-block p-bottom-0 m-auto" style={{ bottom: -8, border: "1px solid #fff", left: "auto", right: "35%", backgroundColor: color, padding: 8, borderRadius: 300 }} />
          </div>
        </div>
        <div className="details pl-2">
          <h3 className="fz-xm fw-bold m-0 p-0">{title}</h3>
          <div className="d-flex m-0 p-0 fz-xm">
            <div className="col-6  p-0">
              {progress}% {status ? "complete" : "On-going"}
            </div>
            <div className="col-6 text-right p-0">
              {lessonCompleted}/{lessonTotal}
            </div>
          </div>
          <svg width="100%" height="4" viewBox="0 0 214 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="214" height="4" rx="2" fill="#DDDDDD" />
            <rect width={progress + "%"} height="4" rx="2" fill={status ? "#21b830" : "#FF7A00"} />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white cs-table-style outline-shadow p-3">
      <div className="row align-items-center">
        <div className="col-8 p-0">
          <p className="fz-1-5 m-0 font-bold">{title}</p>
        </div>
        <div className="col-4 p-0 text-right">
          {/* <button type="button" onClick={onClick} className="btn btn-default fa fa-opt">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" style={{ width: 4 }}>
              <path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z" />
            </svg>
          </button> */}
        </div>
        <div className="divider border-0" />
      </div>
      <div>
        <EnrolledCourseProgress title={"Day Trading Course Lesson 02"} status={false} lessonCompleted="340" lessonTotal={400} progress={87} dayInt={3} dayString={"Wed"} />
        <EnrolledCourseProgress title={"Live Trading Course Lesson 07"} status={false} lessonCompleted="101" lessonTotal={400} progress={33} dayInt={2} dayString={"Tue"} />
        <EnrolledCourseProgress title={"Trader Mentality Course Lesson 22"} lessonCompleted="530" lessonTotal={530} progress={100} dayInt={5} dayString={"Fri"} />
        <div className="row">
          <div className="col-6">
            <p className="text-muted">5 More courses</p>
          </div>
          <div className="col-6">
            <Link to={"/"} className="d-flex align-items-center p-1">
              <span className="pr-1 text-dark">View more</span>
              <svg width="15" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.725 5.14888C23.7248 5.1486 23.7245 5.14827 23.7242 5.14799L18.8256 0.272997C18.4586 -0.0922061 17.865 -0.090847 17.4997 0.276184C17.1345 0.643168 17.1359 1.23675 17.5028 1.60199L20.7918 4.87499H0.9375C0.419719 4.87499 0 5.29471 0 5.81249C0 6.33027 0.419719 6.74999 0.9375 6.74999H20.7917L17.5029 10.023C17.1359 10.3882 17.1345 10.9818 17.4998 11.3488C17.865 11.7159 18.4587 11.7171 18.8256 11.352L23.7242 6.47699C23.7245 6.47671 23.7248 6.47638 23.7251 6.4761C24.0923 6.10963 24.0911 5.51413 23.725 5.14888Z"
                  fill="#000300"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
function CoursePending(params) {
  return (
    <div className="p-2 rad_4 my-4" style={{ position: "relative", background: "linear-gradient(to top, black, #BFBFBF)" }}>
      <div className="py-5" />
      <div className="py-5" />
      <div className="py-sm-5" />
      <div className="p-3">
        <h4 className="m-0 mb-3 text-white " style={{ fontWeight: 600 }}>
          Day Trading Course
          <br />
          Lesson 01 How to trade successfully
        </h4>
        <button className="btn align-items-center d-flex text-white rad_4" style={{ background: "#a11e1e" }}>
          <span className="pr-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.648712 9.33105V14.3329C0.648712 15.2525 1.39698 16.0001 2.31597 16.0001H14.3203C15.24 16.0001 15.9875 15.2525 15.9875 14.3329V9.33105H0.648712V9.33105Z" fill="white" />
              <path d="M7.89533 1.5249L5.39975 2.11712L7.4905 5.19356L10.1935 4.57869L7.89533 1.5249Z" fill="white" />
              <path d="M4.70616 2.28174L2.01651 2.91928L4.08525 5.96707L6.79223 5.3515L4.70616 2.28174Z" fill="white" />
              <path d="M15.9769 2.90997L15.4093 0.757192C15.2786 0.23366 14.7424 -0.0957707 14.2136 0.0249289L11.9727 0.55712L14.0989 3.69159L15.7281 3.3208C15.8168 3.30079 15.8928 3.24543 15.9395 3.16809C15.9862 3.09075 15.9995 2.998 15.9769 2.90997Z" fill="white" />
              <path d="M11.2785 0.721924L8.60358 1.35681L10.9057 4.41725L13.4006 3.8497L11.2785 0.721924Z" fill="white" />
              <path d="M4.00924 5.99707L2.9422 8.66404H5.55849L6.62553 5.99707H4.00924Z" fill="white" />
              <path d="M7.34377 5.99707L6.27673 8.66404H8.89299L9.96006 5.99707H7.34377Z" fill="white" />
              <path d="M15.6541 5.99707H14.0129L12.9458 8.66469H15.9876V6.3305C15.9875 6.14578 15.8388 5.99707 15.6541 5.99707Z" fill="white" />
              <path d="M10.6783 5.99707L9.61124 8.66404H12.2269L13.2946 5.99707H10.6783Z" fill="white" />
              <path d="M1.32296 3.08472L0.779418 3.21342C0.514667 3.27344 0.290587 3.43416 0.148536 3.66493C0.00648451 3.89635 -0.0355306 4.16845 0.0304931 4.43186L0.648715 6.8754V8.66404H2.22394L3.22495 6.16248L3.38767 6.12581L1.32296 3.08472Z" fill="white" />
            </svg>
          </span>
          Continue Lesson
        </button>
      </div>
    </div>
  );
}

/*
[
                  { title: "Samer turk", subject: "Can't access my dashboard", status: "Open", mode: "success" },
                  { title: "Kelvin Hart", subject: "Can't access my dashboard", status: "Replied", mode: "danger" },
                  { title: "Jonny Jose", subject: "Can't access my dashboard", status: "Open", mode: "success" },
                  { title: "Luckas John", subject: "Can't access my dashboard", status: "Replied", mode: "danger" },
                ]
*/
