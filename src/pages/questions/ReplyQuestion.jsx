import { Form, Select, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "../../components/Content";
import Question from "../../services/question";
import qs from "query-string";
import LoadingAnim from "../../components/LoadingAnim";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EmjsF, split, toCapitalize } from "../../applocal";
import APP_USER from "../../services/APP_USER";
import { ItemListText } from "./components/ItemListText";
import Courses from "../../services/courses";
import lesson from "../../services/lesson";

export default function ReplyQuestion({ location }) {
  const [QuestionDetails, setQuestionDetails] = useState({});
  const [Data, setData] = useState({
    course: {},
    lesson: {},
  });
  const [Answers, setAnswers] = useState([]);
  const [CloseQuestion, setCloseQuestion] = useState(false);
  const [Fetching, setFetching] = useState(true);
  const [CourseFetching, setCourseFetching] = useState(true);
  const [LessonFetching, setLessonFetching] = useState(true);
  const [AddingAns, setAddingAns] = useState(false);

  const { data: qid } = qs.parse(location.search);
  const { user, userRl } = useSelector((s) => s.auth);
  function setData_(data = Data) {
    setData((s) => ({ ...s, ...data }));
  }
  function getCourse(id) {
    setCourseFetching(true);
    Courses.getSingle(id)
      .then(({ data: { data } }) => {
        setData_({ course: data });
      })
      .finally(() => setCourseFetching(false));
  }
  function getLesson(id) {
    setLessonFetching(true);
    lesson
      .getSingle(id)
      .then(({ data: { data } }) => {
        setData_({ lesson: data });
      })
      .finally(() => setLessonFetching(false));
  }

  function getSingleQuestion(id, cb = () => {}) {
    setFetching(true);
    Question.getSingle(id)
      .then(({ data: { data } }) => {
        cb(data);
        setCloseQuestion(String(data?.status).toLowerCase() == "closed");
        setQuestionDetails(data);
        setAnswers(data?.answer);
      })
      .finally(() => {
        setFetching(false);
      });
  }
  function onSubmit(values) {
    setAddingAns(true);
    Question.addReply(qid, { answer: JSON.stringify({ ...values, userId: user?.id, userRole: userRl, user: user?.name || split(user?.email, "@") }) })
      .then(({ data: { data } }) => {
        toast.success("Answer has been added successfully!");
        // console.log(data);
        setAnswers(data?.answer);
      })
      .finally(() => setAddingAns(false));
  }
  function onCloseQuestion() {
    const cres = window.confirm("Do you want to close this question?");
    if (!cres) return false;

    Question.closeQuestion(qid).then(() => {
      toast.success("Question closed!");
      setCloseQuestion(true);
    });
  }

  useEffect(() => {
    getSingleQuestion(qid, (data) => {
      getCourse(data.courseId);
      getLesson(data.lessonId);
    });
  }, []);
  if (Fetching || CourseFetching || LessonFetching) {
    return <LoadingAnim />;
  }
  // console.log(QuestionDetails);

  return (
    <>
      <Content className="mt-5">
        <style jsx>{`
          .ant-select:not(.ant-select-customize-input) .ant-select-selector {
            border-radius: 30px;
          }
          .ant-select:not(.ant-select-customize-input) .ant-select-selector {
            background-color: silver;
            background-color: #efebeb;
            border: 0;
          }
          .ant-select-selection-placeholder {
            color: rgba(0, 0, 0, 1);
            font-size: 12px;
          }
        `}</style>
        <Form name="wrap" onFinish={onSubmit} className="w-100 p-3 pr-5" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" /* initialValues={data} onValuesChange={_handleChange}*/>
          <div className="d-flex mb-5 pb-5 align-items-center">
            <ItemListText title="Course Title" value={Data.course?.name} />
            <ItemListText title="Lesson Title" value={Data.lesson?.name} />
          </div>
          {/* <div className="p-4" /> */}
          {/* <div className="d-flex mb-2 align-items-center">
            <label className="pr-3 text-uppercase">Question</label>
            <h4 className="p-3 m-0" style={{ border: 0, borderRadius: 3, backgroundColor: "#fafafa" }}>
              {QuestionDetails?.questionDetails?.subject}
            </h4>
          </div> */}
          <div className="d-flex. mb-5 align-items-center">
            <label className="pr-3 text-uppercase">Question Details</label>
            <div className="px-3 my-4" style={{ border: 0, borderRadius: 3, backgroundColor: "#fafafa" }}>
              <h4 className="p-3 m-0">{QuestionDetails?.questionDetails?.subject}</h4>
              <p className="p-3 m-0 efebeb">{QuestionDetails?.questionDetails?.question}</p>
            </div>
          </div>
          {!CloseQuestion && userRl !== APP_USER.customer && (
            <>
              <Form.Item name="answer" rules={[{ required: true }]}>
                <div className="d-flex">
                  <label className="pr-3 text-uppercase">Answer</label>
                  <Input.TextArea className="w-100 rad_5" rows={10} />
                </div>
              </Form.Item>
              <div className="row">
                <div className="col-1 p-0"></div>
                <div className="col-7 d-flex">
                  <button type="submit" disabled={AddingAns} className="mr-3 btn btn-primary">
                    {AddingAns ? "Sending Answer...." : "Send Reply"}
                  </button>
                  <button onClick={onCloseQuestion} type="button" className="btn btn-danger">
                    Close Question
                  </button>
                </div>
              </div>
            </>
          )}
        </Form>
      </Content>
      <div className="my-5 py-3">
        <h3>Answers ({Answers?.length})</h3>
      </div>
      {Answers?.map((item) => {
        //   ;
        const { answer, user, userRole } = EmjsF(item?.answer).parse();
        return (
          <Content>
            <div className="resize-800 p-3">
              <div className="d-flex align-items-center">
                <div className="">
                  <div className="avatar" style={{ backgroundColor: "#c4c4c4", borderRadius: 300, width: 50, height: 50 }}></div>
                </div>
                <div className="details pl-2">
                  <h3 className="fz-2 fw-bold m-0 p-0">{toCapitalize(String(user))}</h3>
                  <p className="m-0 p-0 fz-sm">{userRole}</p>
                </div>
              </div>
              <div className="resize-700 m-0">
                <h3 className="my-3 fz-4 pl-1">{answer}</h3>
                {/* <div className="col-7 d-flex">
              <button type="submit" className="mr-3 btn btn-danger">
                Reply
              </button>
              <button className="btn btn-danger">Close Ticket</button>
            </div> */}
              </div>
            </div>
          </Content>
        );
      })}
    </>
  );
}
