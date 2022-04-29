import { Form, Select, Input, Button } from "antd";
import React from "react";
import { Content } from "../../components/Content";

export default function AddMessage() {
  const data = [{ name: "ddd", id: 1 }];
  const selectData = [
    { name: "Question ID", value: "#5432" },
    { name: "Priority", value: "High" },
    { name: "Course", value: "Live Trading 101" },
    { name: "Lesson", value: "Mohammad Malek" },
    { name: "Status", value: "Awaiting Customer Reply" },
  ];
  function ItemLists({ title = "", value = "", _data = data }) {
    return (
      <div className="" style={{ marginLeft: "10px" }}>
        <span className="px-2 fw-bold ">{title}</span>
        <Select style={{ border: 0, borderRadius: 30, backgroundColor: "#efebeb" }} placeholder={value} /*value={instructor} onChange={(e) => setInstructor(e)}*/>
          {_data.map(({ name, id: _id }) => (
            <Select.Option value={_id}>{name}</Select.Option>
          ))}
        </Select>
      </div>
    );
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
            <ItemLists key={idx} title={item.name} value={item.value} />
          ))}
        </div>
        <Form name="wrap" className="w-100 p-3 pr-5" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" /* initialValues={data} onValuesChange={_handleChange}*/>
          <Form.Item name="name" rules={[{ required: true }]}>
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
              <button type="submit" className="mr-3 btn btn-danger">
                Reply
              </button>
              <button className="btn btn-danger">Close Ticket</button>
            </div>
          </div>
        </Form>
      </Content>
      <Content>
        <div className="resize-800 p-3">
          <div className="d-flex align-items-center">
            <div className="">
              <div className="avatar" style={{ backgroundColor: "#c4c4c4", borderRadius: 300, width: 50, height: 50 }}></div>
            </div>
            <div className="details pl-2">
              <h3 className="fz-2 fw-bold m-0 p-0">Muhammad Melak</h3>
              <p className="m-0 p-0 fz-sm">Technical Support</p>
            </div>
          </div>
          <div className="resize-700 m-0">
            <h3 className="my-3 fz-4 pl-1">Thank you for reaching out. We have updated your account billing details for you</h3>
            <div className="col-7 d-flex">
              <button type="submit" className="mr-3 btn btn-danger">
                Reply
              </button>
              <button className="btn btn-danger">Close Ticket</button>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
