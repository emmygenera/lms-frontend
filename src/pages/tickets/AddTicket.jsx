import { Form, Select, Input, Button } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl, RandomString, split } from "../../applocal";
import { Content } from "../../components/Content";
import LoadingAnim from "../../components/LoadingAnim";
import Courses from "../../services/courses";
import orderService from "../../services/orders";
import Staff from "../../services/staff";
import Role from "../../services/role";
import Ticket from "../../services/ticket";

export default function AddTicket({ location }) {
  const data = [{ name: "ddd", id: 1 }];
  const [selectData, setselectData] = useState([
    // { name: "TICKET ID", value: "#5432" },
    // { name: "Priority", value: "High" },
    { name: "Course", key: "courseId", value: "Select", data: [] },
    { name: "Assigned To", key: "department", value: "Select", data: [] },
    // { name: "Status", value: "Awaiting Customer Reply" },
  ]);
  const [formFields, setformFields] = useState({ courseId: "", department: "" });
  const [fetchCourses, setfetchCourses] = useState([]);
  const [fetching, setfetching] = useState(false);
  const [sending, setsending] = useState(false);

  const { user } = useSelector((s) => s.auth);
  /*function getUserOrder(data) {
    // console.log(data);
    setCourseOrderLoading(true);
    orderService
      .myOrders({ id: user?.id })
      .then(({ data: { data } }) => {
        // Promise.all(data.data.map(({ _id }) => orderService.deleteorder(_id))).finally(() => toast.success("deleted success"));
        setConfirmOrder(data);
      })
      .catch(() => toast.error("Opps! Error getting courses"))
      .finally(() => setCourseOrderLoading(false));
  }
  */

  function getCourses() {
    setfetching(true);
    let csdata = [];
    // Courses.getPaginated({ pageSize: 100 })
    orderService
      .myOrders({ id: user?.id })
      .then(({ data: { data } }) => {
        const _data = data.flatMap(({ courses }) =>
          courses.map(({ courseId, course, ...otherProp }, idx) => {
            return { _id: courseId, ...course, ...otherProp };
          })
        );

        setfetchCourses(_data);
        csdata = _data;
        // setselectData(selectData.map((itm) => (itm.key == "courseId" ? { name: "Course", value: "Select Course", data } : itm)));
      })
      .finally(() => getStaffs(csdata));
  }
  function getStaffs(csData) {
    setfetching(true);
    Role.getAll(undefined, 100)
      .then(({ data: { data } }) => {
        const _data = data.filter((itm) => !["admin", "user", "instructor"].includes(itm?.roleName));
        // console.log(data.fliter((itm) => !["admin", "user", "instructor"].includes(itm?.roleName)));
        setselectData(selectData.map((itm) => (itm.key == "department" ? { ...itm, data: _data.map((itm) => ({ name: itm?.roleName, _id: itm?.roleName })) } : itm.key == "courseId" ? { ...itm, data: csData } : itm)));
      })
      .finally(() => {
        setfetching(false);
      });
  }

  function onSubmitTicket(values) {
    const cs = fetchCourses.filter((item) => item._id === formFields.courseId).reduce((r, l) => l, {});
    if (!formFields.courseId || !formFields.department) {
      toast.error("Above fields(Course and Department) needs to be selected!");
      return;
    }
    setsending(true);
    Ticket.add({
      ...formFields,
      userId: user.id,
      // staffId: RandomString(16),
      name: user?.name || split(user?.email, "@", 0),
      ticketDetails: { ...values, courseName: cs?.name, name: user.name || split(user?.email, "@", 0) },
    })
      .then(() => {
        toast.success("Ticked has been submitted!...", { onClose: () => (window.location.href = baseUrl("#/tickets")) });
        // setTimeout(() => {
        //   window.location.href = baseUrl("tickets");
        // }, 500);
      })
      .finally(() => {
        setsending(false);
      });
  }
  useEffect(() => {
    getCourses();
    getStaffs();
  }, []);
  function ItemLists({ title = "", name, value = "", _data = data }) {
    return (
      <div className="" style={{ marginLeft: "10px" }}>
        <span className="px-2 fw-bold ">{title}</span>
        <Select
          onChange={(val) => {
            setformFields((s) => ({ ...s, [name]: val }));
          }}
          style={{ border: 0, borderRadius: 30, backgroundColor: "#efebeb", minWidth: 300 }}
          defaultValue={formFields[name] || value}
          // placeholder={value} /*value={instructor} onChange={(e) => setInstructor(e)}*/
        >
          {_data.map(({ name, _id }) => (
            <Select.Option style={{ width: "100%", whiteSpace: "wrap" }} value={_id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  }
  if (fetching) {
    return <LoadingAnim />;
  }
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
          {selectData.map((item, idx) => (
            <ItemLists key={idx} name={item.key} title={item.name} value={item.value} _data={item.data} />
          ))}
        </div>
        <Form name="wrap" onFinish={onSubmitTicket} className="w-100 p-3 pr-5" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" /* initialValues={data} onValuesChange={_handleChange}*/>
          <Form.Item name="subject" rules={[{ required: true }]}>
            <div className="d-flex">
              <label className="pr-3 text-uppercase">Subject</label>
              <Input className="w-100 rad_10" />
            </div>
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <div className="d-flex">
              <label className="pr-3 text-uppercase">Details</label>
              <Input.TextArea className="w-100 rad_5" rows={10} />
            </div>
          </Form.Item>
          <div className="row">
            <div className="col-1 p-0"></div>
            <div className="col-7 d-flex">
              <button disabled={sending} type="submit" className="mr-3 btn btn-primary">
                {sending ? "Submitting Ticket..." : "Send Ticket"}
              </button>
              {/* <button className="btn btn-danger">Close Ticket</button> */}
            </div>
          </div>
        </Form>
      </Content>
    </>
  );
}
