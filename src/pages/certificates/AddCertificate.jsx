import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { EmjsF, toCapitalize } from "../../applocal";
import CountryList from "../../components/CountriesDropdown";
import LoadingAnim from "../../components/LoadingAnim";
import Lead from "../../services/leads";
import qs from "query-string";
import { toast } from "react-toastify";
import Courses from "../../services/courses";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier, convertToRaw, ContentState, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Marketing from "../../services/marketingService";
import User from "../../services/user";
import certificateAPI from "../../services/certificateAPI";

export default function ({ history, location }) {
  const [initVals, setInitVals] = React.useState({
    username: "",
    userId: "",
    files: "",
    certificate: "",
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [is_init, setis_init] = useState(false);
  const [files, setFiles] = useState(null);
  const [courses, setCourses] = useState([]);
  const [fetching, setFetching] = useState(false);

  function getCourses() {
    setFetching(true);
    Courses.getAll()
      .then(({ data: { data } }) => {
        setCourses(data);
      })
      .finally(() => setFetching(false));
  }

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });

  async function getUsers() {
    const {
      data: { data: tipsData },
    } = await User.getAll(paramData).catch(() => toast.error("unable to get users data"));
    setUsers(tipsData);
  }

  const addNew = (vals) => {
    vals.files = files;

    // editorState;
    setLoading(true);
    const sd = paramData ? "update" : "add";
    certificateAPI[sd](vals, paramData)
      .then((result) => {
        history.push("/certificates");
        // console.log(result)
      })
      .finally(() => setLoading(false));
  };
  const onChangeFiles = (e) => {
    // console.log(e.target.files);
    setFiles(e.target.files[0]);
  };

  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } //else getCampaignData();
    getUsers();
    getCourses();
  }, []);

  if (!is_init || fetching) {
    return <LoadingAnim />;
  }

  return (
    <>
      <Form name="wrap" className="resize-450." labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew} initialValues={initVals}>
        <div className="shadow-sm p-3 row mt-md-5">
          <style jsx>
            {`
              .ant-col.ant-form-item-label.ant-form-item-label-left: {
                flex: unset;
              }
            `}
          </style>
          <div className=" col-md-6">
            <Form.Item label="User's Name" className="text-right" name="username" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Select User" name="userId" rules={[{ required: true }]}>
              <Select className={"myinput"} placeholder={"Please select a User"}>
                {users.map(({ _id, name, email }, index) => (
                  <Select.Option key={index} value={_id}>
                    {name || email}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Certificate Upload" className="text-right" name="files" rules={[{ required: true }]}>
              <input type="file" onChange={onChangeFiles} accept="image/*" className="form-control myinput " />
            </Form.Item>
            {/* <Form.Item label="Certificate Course Name" className="text-right" name="certificate" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item> */}
            <Form.Item label="Select Course" name="certificate" rules={[{ required: true }]}>
              <Select className={"myinput"} placeholder={"Please select a Customer Name"}>
                {courses.map(({ _id, name }, index) => (
                  <Select.Option key={index} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-4 offset-sm-4 btnupdate" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {paramData ? "Update" : "Upload"} Certificate
              </Button>
            </Form.Item>
          </div>
          {/* <div className="col-5"></div> */}
        </div>
      </Form>
    </>
  );
}
