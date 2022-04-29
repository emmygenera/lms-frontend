import React, { useEffect, useState } from "react";
import { baseUrl, DateTime, jsonValue, toLowerCase } from "../../applocal";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import "../courses/user/page6/page6.scss";
import Question from "../../services/question";
import moment from "moment";
import LoadingAnim from "../../components/LoadingAnim";
import Ticket from "../../services/ticket";
import message from "../../services/MessageAPI";
import APP_USER from "../../services/APP_USER";
import orderService from "../../services/orders";
import InvoiceAPI from "../../services/InvoiceAPI";
import { toast } from "react-toastify";
import CustomerQuestionTicket from "../dashboard/components/CustomerQuestionTicket";
import CustomerOverviewLogs from "./components/CustomerOverviewLogs";
import qs from "query-string";
import { NewCustomer } from "..";
import lesson from "../../services/lesson";
import { packagesValue } from "../../pages/courses/component/Data.json";

export default function CustomerOverview({ location, ...otherProps }) {
  const { userRl, user, userRlId } = useSelector((state) => state.auth);

  const [questionsData, setQuestionsData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [Data, setData] = useState({
    courseOrder: [],
    orders: [],
    invoices: [],
  });

  // const [questionLoading, setQuestionLoading] = useState(false);
  // const [ticketLoading, setTicketLoading] = useState(false);
  // const [messageLoading, setMessageLoading] = useState(false);

  const [loading, setLoading] = useState({
    question: false,
    message: false,
    orders: false,
    ticket: false,
    invoices: false,
    courseOrderLoading: true,
  });
  const [CourseLessonLoading, setCourseLessonLoading] = useState(false);
  const [CourseLessons, setCourseLessons] = useState([]);
  const [CourseData, setCourseData] = useState({});
  const [Courses, setCourses] = useState([]);

  const getCourseLessons = (courseId) => {
    setCourseLessonLoading(true);
    // setCourseLessons([]);
    //  user?.id;
    return lesson.getLessonByCourseAndUser(courseId, user.id);
    // .then(({ data: { data } }) => setCourseLessons(data.map((itm) => ({ ...itm, date: DateTime(itm.createdAt).stringFormat() }))))
    // .finally(() => setCourseLessonLoading(false));
  };

  const { data: paramData } = qs.parse(location.search);

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

    Question.getMyQuestion({ id: paramData, pageSize })
      .then(({ data: { data: questions = [] } }) => {
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        setQuestionsData(
          questions.map((state, index) => {
            const md = { open: "success", closed: "danger", active: "primary" };
            const mode = md[String(state.status).toLowerCase()] || "info";

            return { ...state, title: "Customer", link: "replyQuestion?data=" + state?._id, subject: state.questionDetails.subject, mode };
          })
        );
      })
      .catch(() => toast.error("Error getting Customer's Questions"))
      .finally(() => setLoading_({ question: false }));
  }

  function getMessages() {
    setLoading_({ message: true });
    message
      .getMyMessage({ id: paramData, pageSize })
      .then(({ data: { data: messages = [] } }) => {
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        setMessagesData(
          messages.map((state, index) => {
            const md = { open: "success", closed: "danger", active: "primary" };
            const mode = md[String(state.status).toLowerCase()] || "info";

            return { ...state, title: "Customer", subject: state?.ticketDetails?.subject, mode };
          })
        );
      })
      .finally(() => setLoading_({ message: false }));
  }

  function getTickets() {
    setLoading_({ ticket: true });

    Ticket.getMyTickets({ id: paramData, pageSize })
      .then(({ data: { data: tickets = [] } }) => {
        // Promise.all(questions.map((item) => Question.delete(item._id))).then(({ data }) => console.log(data));
        setTicketsData(
          tickets.map((state, index) => {
            const md = { open: "success", closed: "danger", active: "primary" };
            const mode = md[String(state.status).toLowerCase()] || "info";

            return { ...state, title: "Customer", link: "replyTicket?data=" + state?._id, subject: state?.ticketDetails?.subject, mode };
          })
        );
      })
      .catch(() => toast.error("Error getting Customer's tikets"))
      .finally(() => setLoading_({ ticket: false }));
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

  const getOrders = () => {
    setLoading_({ orders: true });
    orderService
      .myOrders({ id: paramData, page: 1, pageSize: 50 })
      .then(({ data: { data: orders, total = 0 } }) => {
        // reduce((l, r) => r)
        // console.log(orders);
        //  const data = courses?.data || [];
        //  data[0].courses;
        setCourses(orders);
        // setData_({
        //   orders: orders.flatMap((item) =>
        //     item.courses.map(({ course, courseId, coursePackage }) => ({
        //       title: course?.name,
        //       link: "viewCourse?data=" + courseId + "&usr=" + paramData,
        //       status: "view",
        //       // ...course,
        //       // _id: courseId,
        //     }))
        //   ),
        // });
      })
      .catch(() => toast.error("Error getting Customer's orders"))
      .finally(() => setLoading({ orders: false }));
  };

  const getInvoices = () => {
    setLoading_({ invoices: true });
    InvoiceAPI.getMyInvoices({ id: paramData, page: 1, pageSize: 50 })
      .then(({ data: { data: orders, total = 0 } }) => {
        // reduce((l, r) => r)

        //  const data = courses?.data || [];
        //  data[0].courses;
        setData_({
          invoices: orders?.map((item) => ({
            title: item?.name,
            subject: item?.total + " JOD",
            link: "newInvoice?data=" + item?._id + "&usr=" + paramData,
            status: item?.invoicestatus,
            // ...course,
            // _id: courseId,
          })),
        });
      })
      .catch(() => toast.error("Error getting Customer's Invoices"))
      .finally(() => setLoading({ invoices: false }));
  };

  useEffect(() => {
    //  ConfirmOrder?.map((item) => item.courses?.some(({ courseId }) => courseId == dataParam));
    // console.log({ Courses });
    let _setCourseData = {};
    Promise.all(
      Courses.map(({ courses, startDate }) => {
        // console.log(courses, Courses);
        return Promise.all(
          courses.map(({ courseId, course, ...otherProp }, idx) => {
            // setCourseData((s) => ({ ...s, [courseId]: { _id: courseId, ...course, ...otherProp, startDate } }));
            _setCourseData = { ..._setCourseData, [courseId]: { _id: courseId, ...course, ...otherProp, startDate } };

            return getCourseLessons(courseId);
          })
        );
      })
    ).then((data) => {
      // console.log(data.map((s) => s.map(({ data: { data } }) => data)).flat(1));

      const __CustomerData = data.flatMap((s) => s.map(({ data: { data } }) => data));
      setData_({
        orders: __CustomerData.flatMap((item) => {
          const lessonCompleted = item.filter((itm) => toLowerCase(itm.completedStatus) == "completed").length;
          const lessonTotal = item?.length;
          const lessonProg = Math.ceil((lessonCompleted / lessonTotal) * 100);

          const course_ = _setCourseData[item[0]?.courseId];
          const months = jsonValue(packagesValue, 0).get(course_?.coursePackage?.duration),
            startDate = course_?.startDate,
            inTime = DateTime(startDate).addMonths(months),
            isCourseExpired = DateTime(inTime).expired();

          const expireIn = DateTime(inTime).daysToGo(),
            expireInString = (expireIn == -1 ? 0 : expireIn) + " day" + (expireIn > 1 ? "s" : "");

          return {
            title: course_?.name,
            subject: lessonProg + "% completion",
            link: "viewCourse?data=" + item[0]?.courseId + "&usr=" + paramData,
            status: (
              <>
                <p className={"p-0 m-0 mb-1 text-" + (isCourseExpired ? "danger" : "success")}>{isCourseExpired ? "Expired" : "Active"}</p>
                <p className="p-0 m-0 text-dark">{expireInString}</p>
              </>
            ),
            // ...course,
            // _id: courseId,
          };
        }),
      });
      setCourseLessons(data.flatMap((s) => s.map(({ data: { data } }) => data)));
    });
  }, [jsonValue(Courses).toStringAll()]);

  useEffect(() => {
    getQuestions();
    getTickets();
    getInvoices();

    if (userRl == APP_USER.customer) {
      getCourseOrderProgress();
    } else {
      //getMessages();
      getOrders();
    }
  }, [paramData]);

  // console.log(Data.orders);

  const EnrolledCourses_ = Data.courseOrder;
  // console.log(EnrolledCourses_);
  // Data.courseOrderLoading?.map((item) => item.courses?.some(({ courseId }) => courseId == dataParam));
  // console.log(Data.courseOrderLoading);
  return (
    <div className="pt-4">
      <NewCustomer location={location} {...otherProps} />
      <br />
      <div className="col-sm-12">
        {/* {loading.courseOrderLoading ? <LoadingAnim /> : <CoursePending data={jsonValue(EnrolledCourses_, { courses: [] }).get(0)} />} */}
        <CustomerOverviewLogs
          data={[
            { title: "Customer Courses", to: "", data: Data.orders, loading: loading.orders },
            //  { title: "Customer Messages", to: "", data: [], loading: true },
            { title: "Customer Tickets", to: "", data: ticketsData, loading: loading.ticket },
            { title: "Customer Questions", to: "", data: questionsData, loading: loading.question },
            { title: "Customer Invoices", to: "", data: Data.invoices, loading: loading.invoices },
          ]}
          //   question={{ loading: loading.question, data: questionsData }}
          //   ticket={{ loading: loading.ticket, data: ticketsData }}
          //
        />
      </div>
    </div>
  );
}
