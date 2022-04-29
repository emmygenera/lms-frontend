import { Form, Select, Input, Button } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl, jsonValue, split } from "../../applocal";
import { Content } from "../../components/Content";
import LoadingAnim from "../../components/LoadingAnim";
import Courses from "../../services/courses";
import Question from "../../services/question";
import Staff from "../../services/staff";
import qs from "query-string";
import { ItemListText } from "./components/ItemListText";

export default function AddTicket({ location }) {
  const data = [{ name: "ddd", id: 1 }];
  const [selectData, setselectData] = useState([
    // { name: "TICKET ID", value: "#5432" },
    // { name: "Priority", value: "High" },
    { name: "Course", key: "courseId", value: "Select", data: [] },
    { name: "Assigned To", key: "staffId", value: "Select", data: [] },
    // { name: "Status", value: "Awaiting Customer Reply" },
  ]);
  const [formFields, setformFields] = useState({ courseId: "", staffId: "" });
  const [fetchCourses, setfetchCourses] = useState([]);
  const [fetching, setfetching] = useState(false);
  const [sending, setsending] = useState(false);

  const { user } = useSelector((s) => s.auth);

  const { data: paramData, lssnId } = qs.parse(location.search);
  const { id: courseId, title, lssn: lessonId, lssntt } = jsonValue(paramData).parse();

  function getCourses() {
    setfetching(true);
    let csdata = [];
    Courses.getPaginated({ pageSize: 100 })
      .then(({ data: { data } }) => {
        setfetchCourses(data);
        csdata = data;
        // setselectData(selectData.map((itm) => (itm.key == "courseId" ? { name: "Course", value: "Select Course", data } : itm)));
      })
      .finally(() => getStaffs(csdata));
  }
  function getStaffs(csData) {
    setfetching(true);
    Staff.getPaginated(undefined, 100)
      .then(({ data: { data } }) => {
        setselectData(selectData.map((itm) => (itm.key == "staffId" ? { ...itm, data } : itm.key == "courseId" ? { ...itm, data: csData } : itm)));
      })
      .finally(() => {
        setfetching(false);
      });
  }

  function onSubmitQuestion(values) {
    // const cs = fetchCourses.filter((item) => item._id === formFields.courseId);
    // if (!formFields.courseId || !formFields.staffId) {
    //   toast.error("Above fields(Course and Staff) needs to be selected!");
    //   return;
    // }

    setsending(true);
    Question.add(
      //   {
      //     ...formFields,
      //     userId: user.id,
      //     name: cs[0].name,
      //     ticketDetails: { ...values },
      //   },
      {
        // ...formFields
        userId: user.id,
        courseId,
        lessonId,
        subject: user.name || split(user?.email, "@", 0),
        questionDetails: { ...values, name: user.name || split(user?.email, "@", 0) },
      }
    )
      .then(() => {
        toast.success("Question has been submitted!...", { onClose: () => (window.location.href = baseUrl("#/viewCourse?data=" + courseId)) });
        setTimeout(() => {
          window.location.href = baseUrl("#/viewCourse?data=" + courseId);
        }, 1000);
        // setTimeout(() => {
        //   window.location.href = baseUrl("tickets");
        // }, 500);
      })
      .finally(() => {
        setsending(false);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Request could not be processed!");
      });
  }

  //   useEffect(() => {
  //     getCourses();
  //     getStaffs();
  //   }, []);

  function ItemLists({ title = "", name, value = "", _data = data }) {
    return (
      <div className="" style={{ marginLeft: "10px" }}>
        <span className="px-2 fw-bold ">{title}</span>
        <Select
          onChange={(val) => {
            // console.log(val);
            setformFields((s) => ({ ...s, [name]: val }));
          }}
          style={{ border: 0, borderRadius: 30, backgroundColor: "#efebeb" }}
          defaultValue={formFields[name] || value}
          //placeholder={value} /*value={instructor} onChange={(e) => setInstructor(e)}*/
        >
          {_data.map(({ name, _id }) => (
            <Select.Option value={_id}>{name}</Select.Option>
          ))}
        </Select>
      </div>
    );
  }

  if (!lessonId || !paramData) toast.error("Invalid request params!");
  if (fetching || !lessonId || !paramData) return <LoadingAnim />;

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
        <div className="d-flex flex-wrap">
          {/* {selectData.map((item, idx) => (
            <ItemLists key={idx} name={item.key} title={item.name} value={item.value} _data={item.data} />
          ))} */}
          <ItemListText title="Course Title" value={title} />
          <ItemListText title="Lesson Title" value={lssntt} />
        </div>
        <Form name="wrap" onFinish={onSubmitQuestion} className="w-100 p-3 pr-5" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" /* initialValues={data} onValuesChange={_handleChange}*/>
          <Form.Item name="subject" rules={[{ required: true }]}>
            <div className="d-flex">
              <label className="pr-3 text-uppercase">Subject</label>
              <Input className="w-100 rad_10" />
            </div>
          </Form.Item>
          <Form.Item name="question" rules={[{ required: true }]}>
            <div className="d-flex">
              <label className="pr-3 text-uppercase">Details</label>
              <Input.TextArea className="w-100 rad_5" rows={10} />
            </div>
          </Form.Item>
          <div className="row">
            <div className="col-1 p-0"></div>
            <div className="col-7 d-flex">
              <button disabled={sending} type="submit" className="mr-3 btn btn-primary">
                {sending ? "Submitting Question..." : "Submit Question"}
              </button>
              {/* <button className="btn btn-danger">Close Ticket</button> */}
            </div>
          </div>
        </Form>
      </Content>
    </>
  );
}
