import React, { useEffect, useState } from "react";
import { baseUrl, jsonValue } from "../../applocal";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import "../courses/user/page6/page6.scss";
import Question from "../../services/question";
import moment from "moment";
import LoadingAnim from "../../components/LoadingAnim";
import Ticket from "../../services/ticket";
import CoursePending from "./components/CoursePending";
import EnrolledCourses from "./components/EnrolledCourses";
import Stats from "./components/Stats";
import Orders from "./components/Orders";
import MessageTicket from "./components/MessageTicket";
import CustomerQuestionTicket from "./components/CustomerQuestionTicket";
import ListItem from "./components/ListItem";
import Welcome from "./components/Welcome";
import List from "./components/List";
import message from "../../services/MessageAPI";
import APP_USER from "../../services/APP_USER";
import orderService from "../../services/orders";
import { toast } from "react-toastify";
import settingsAPI from "../../services/settingsAPI";
import QuickAddURL from "../../routing/QuickAddURL";

const { Paragraph } = Typography;

// atob();
// btoa();
export default function Dashboard() {
  const { userRl, user, userRlId } = useSelector((state) => state.auth);

  const [questionsData, setQuestionsData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [Data, setData] = useState({
    courseOrder: [],
    orders: [],
    welcomeMessage: {},
  });

  // const [questionLoading, setQuestionLoading] = useState(false);
  // const [ticketLoading, setTicketLoading] = useState(false);
  // const [messageLoading, setMessageLoading] = useState(false);

  const [loading, setLoading] = useState({
    question: false,
    message: false,
    orders: false,
    ticket: false,
    courseOrderLoading: true,
    welcomeMessage: false,
  });

  const isDashboardVisible = pmac(["admin", "manager"]).includes(userRl);
  const pageSize = 4;

  function setLoading_(data = loading) {
    setLoading((s) => ({ ...s, ...data }));
  }
  function setData_(data = Data) {
    setData((s) => ({ ...s, ...data }));
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

            return { ...state, link: "replyQuestion?data=" + state?._id, title: state?.questionDetails?.name || "Customer", subject: state.questionDetails.subject, mode };
          })
        );
      })
      .finally(() => setLoading_({ question: false }));
  }

  function getMessages() {
    setLoading_({ message: true });
    const qs = (id, type) => {
      switch (type) {
        case APP_USER.customer:
          return message.getMyMessage({ id, pageSize });
        default:
          return message.getPaginated(1, pageSize);
      }
    };

    qs(user.id, userRl)
      .then(({ data: { data: messages = [] } }) => {
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        setMessagesData(
          messages.map((state, index) => {
            const md = { open: "success", closed: "danger", active: "primary" };
            const mode = md[String(state.status).toLowerCase()] || "info";

            return { ...state, link: "replyMessage?data=" + state?._id, title: state?.subject || "Customer", subject: state?.ticketDetails?.subject, mode };
          })
        );
      })
      .finally(() => setLoading_({ message: false }));
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

            return { ...state, title: state?.ticketDetails?.name || "Customer", link: "replyTicket?data=" + state?._id, subject: state?.ticketDetails?.subject, mode };
          })
          //  welcomeMessage: data?.map((item) => ({
          //   ...item,
          //   // link: "newInvoice?data=" + item?._id + "&usr=" + paramData,
          //   link: "message?data=" + item?._id + "&usr=" + paramData,

          //   // _id: courseId,
          // })
        );
      })
      .finally(() => setLoading_({ ticket: false }));
  }

  function getWelcomeMessage() {
    setLoading_({ welcomeMessage: true });

    settingsAPI
      .getWelcomeMessage()
      .then(({ data: { data } }) => {
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        setData({ welcomeMessage: data });
      })
      .finally(() => setLoading_({ welcomeMessage: false }));
  }

  function getCourseOrderProgress(data) {
    // console.log(data);
    setLoading_({ courseOrderLoading: true });
    orderService
      .myOrders({ id: user?.id })
      .then(({ data: { data } }) => {
        // Promise.all(data.data.map(({ _id }) => orderService.deleteorder(_id))).finally(() => toast.success("deleted success"));
        setData_({ courseOrder: data });
      })
      .catch(() => toast.error("Opps! Error getting courses"))
      .finally(() => setLoading_({ courseOrderLoading: false }));
  }
  // const [data, setDate] = useState([]);

  const getOrders = () => {
    setLoading_({ orders: true });
    orderService
      .getPaginated(1, 6)
      .then(({ data: { data: orders, total = 0 } }) => {
        //  console.log({ orders });
        setData_({ orders: orders.map((order, index) => ({ ...order, actions: "", id: <Link to={"orders?data=" + order?._id}>{index + 1}</Link>, expire_in: moment(order.expireDate).format("L"), index: index + 1, join_date: moment(order.createdAt).format("L") })) });
      })
      .finally(() => setLoading({ orders: false }));
  };
  useEffect(() => {
    getQuestions();
    getTickets();
    getWelcomeMessage();

    if (userRl == APP_USER.customer) {
      getCourseOrderProgress();
    } else {
      getMessages();
      getOrders();
    }
  }, []);
  //
  const EnrolledCourses_ = Data.courseOrder;
  // console.log(EnrolledCourses_);
  // Data.courseOrderLoading?.map((item) => item.courses?.some(({ courseId }) => courseId == dataParam));
  // console.log(Data.courseOrderLoading);
  return (
    <div className="pt-5">
      <div className="row mt-5">
        <div className="col-sm-9">
          <Welcome data={Data.welcomeMessage} loading={loading.welcomeMessage} />
          {isDashboardVisible ? (
            <>
              <Stats />
              <Orders data={Data.orders} loading={loading.orders} />
              <MessageTicket
                message={{ loading: loading.message, data: messagesData }}
                ticket={{ loading: loading.ticket, data: ticketsData }}
                //
              />
            </>
          ) : (
            <>
              {loading.courseOrderLoading ? <LoadingAnim /> : <CoursePending data={jsonValue(EnrolledCourses_, { courses: [] }).get(0)} />}
              <CustomerQuestionTicket
                question={{ loading: loading.question, data: questionsData }}
                ticket={{ loading: loading.ticket, data: ticketsData }}
                //
              />
            </>
          )}
        </div>
        <div className="col-sm-3">
          {isDashboardVisible ? (
            <>
              {/* <ListItem
                loading={loading.question}
                title="Latest Questions"
                data={questionsData}
                renderItems={({ data }) => <List {...data} />}
                //
              /> */}
              <div className="mt-4">
                {/* <Link to="/newCourse" className="btn btn-dark btn-block shadow rad_5 w-100 p-3">
                  + Quick Add
                </Link> */}
                <span className="dropdown">
                  <button type="button" className="btn btn-dark btn-block shadow rad_5 w-100 p-3 p-link. .nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
                    + Quick Add
                  </button>
                  {/* <Link class="dropdown-item" to="/newCourse"> */}
                  {/* <img src={baseUrl("images/profile.png")} id="bg-icon" width="35px" height="38px" sstyle={{ position: "absolute", top: "-20px" }} /> */}
                  {/* </Link> */}
                  <div class="dropdown-menu" style={{ minWidth: "16rem" }} aria-labelledby="dropdownMenuButton">
                    <div className="p-3">
                      {QuickAddURL.map(
                        ({ lable, url, perm }) =>
                          perm.includes(userRl) && (
                            <p className="py-1 text-center">
                              <Link to={url} className="text-dark">
                                {lable}
                              </Link>
                            </p>
                          )
                      )}
                    </div>
                  </div>
                </span>
              </div>
            </>
          ) : (
            <>
              {/* CustomerQuestion */}
              <div className="">{loading.courseOrderLoading ? <LoadingAnim /> : <EnrolledCourses data={EnrolledCourses_} />}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
