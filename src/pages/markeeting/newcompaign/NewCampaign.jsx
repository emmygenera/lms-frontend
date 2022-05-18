import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { EmjsF, toCapitalize } from "../../../applocal";
import CountryList from "../../../components/CountriesDropdown";
import LoadingAnim from "../../../components/LoadingAnim";
import Lead from "../../../services/leads";
import qs from "query-string";
import { toast } from "react-toastify";
import Courses from "../../../services/courses";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier, convertToRaw, ContentState, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Marketing from "../../../services/marketingService";
import User from "../../../services/user";
import Customer from "../../../services/customer";
import ContentEditor from "../../components/ContentEditor";

const NewCampaign = ({ history, location }) => {
  const [initVals, setInitVals] = React.useState({
    name: "",
    users: [],
    description: "",
    sendFrom: "",
    date: "",
    sendDate: "",
    htmlEditor: "",
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(["user1", "user2"]);
  const [is_init, setis_init] = useState(false);
  const [editorState, setEditorState] = useState("");
  const [form] = Form.useForm();

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });

  async function getCampaignData() {
    const {
      data: { data: tipsData },
    } = await Marketing.getSingle(paramData).catch(() => toast.error("unable to get Leads data"));
    if (EmjsF(tipsData?.users).isArray()) tipsData.users = tipsData.users.map((v) => EmjsF(v).toString());
    setInitVals(tipsData);
    setis_init(true);
  }

  async function getUsers() {
    const {
      data: { data: tipsData },
    } = await Lead.getAll(paramData).catch(() => toast.error("unable to get Leads data"));
    const {
      data: { data: usersData },
    } = await Customer.getAll(paramData).catch(() => toast.error("unable to get User data"));
    setUsers([].concat(usersData, tipsData));
  }

  const onEditorStateChange = (event) => {
    let editorSourceHTML = draftToHtml(convertToRaw(event.getCurrentContent()));
    setEditorState(editorSourceHTML);
  };

  const addNew = (vals) => {
    // vals.users = vals.users.map((v) => ({ userId: v }));

    // editorState;
    setLoading(true);
    const sd = paramData ? "update" : "add";
    Marketing[sd]({ data: vals, id: paramData })
      .then((result) => {
        history.push("/marketing");
        // console.log(result)
      })
      .finally(() => setLoading(false));
  };
  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } else getCampaignData();
    getUsers();
  }, []);
  const onEditorChange =
    (fieldName = "description") =>
    (e) => {
      const editorContent = e.target.getContent();
      // console.log(editorContent);
      // se({ description: editorContent });
      form.setFieldsValue({ [fieldName]: editorContent });
    };
  if (!is_init) {
    return <LoadingAnim />;
  }

  return (
    <>
      <Form form={form} name="wrap" className="resize-450." labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew} initialValues={initVals}>
        <div className="shadow-sm p-3 row mt-md-5">
          <div className=" col-md-6">
            <h5 className="offset-sm-3 mb-3 mt-5">
              <b>Lead Information</b>
            </h5>

            <Form.Item label="Campaign Name" className="text-right" name="name" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Select Users / Lists" name="users" rules={[{ required: true }]}>
              <Select
                showSearch
                optionFilterProp="children"
                // onSearch={(v) => console.log(v)}
                filterOption={(input, option) => {
                  const childrenValue = String(option?.props?.children).toLowerCase().trim();
                  // const value = String(option?.props?.value).toLowerCase().trim();
                  return childrenValue.startsWith(input);
                }}
                mode="multiple"
                className={"myinput"}
                placeholder={"Please select a User"}
                defaultValues={[]}
              >
                {users.map(
                  ({ _id, name, email }, index) =>
                    email && (
                      <Select.Option key={index} value={email}>
                        {email}
                      </Select.Option>
                    )
                )}
              </Select>
            </Form.Item>
            <Form.Item label="Campaign Description" name="description" rules={[{ required: true }]}>
              {/* <Input.TextArea rows={5} className="myinput" /> */}
              <ContentEditor
                //
                // onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={onEditorChange()}
                initialValue={initVals?.description}
              />
            </Form.Item>
            {/* <CountryList className="myinput" /> */}
            <Form.Item label="Send From" name="sendFrom" rules={[{ required: false }]}>
              <Input className="myinput" />
            </Form.Item>
            {/* <Form.Item label="Date" name="date" rules={[{ required: false }]}>
              <Input className="myinput" type="date" />
            </Form.Item> */}
            <Form.Item label="Send Date" name="sendDate" rules={[{ required: true }]}>
              <Input className="myinput" type="date" />
            </Form.Item>
            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
              <Select showSearch className={"myinput"} placeholder={"Please select a User"} defaultValues={""}>
                {["hold", "pending", "sent"].map((name, index) => (
                  <Select.Option key={index} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-4 offset-sm-4 btnupdate" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {paramData ? "Update" : "Add"} Campaign
              </Button>
            </Form.Item>
          </div>
          <div className="col-6">
            <div className="row mb-2 mt-5">
              <p className="col-sm-3 text-sm-end" style={{ fontSize: "0.9em" }}>
                HTML Editor
              </p>

              <div className="col-sm-7">
                <Form.Item name="htmlcontents" rules={[{ required: false }]}>
                  {/* <Input.TextArea className="myinput" rows="25" /> */}
                  <ContentEditor
                    //
                    // onInit={(evt, editor) => (editorRef.current = editor)}
                    minHeight={400}
                    editorProps={{ height: 500 }}
                    onChange={onEditorChange("htmlcontents")}
                    initialValue={initVals?.htmlcontents}
                  />
                </Form.Item>
                {/* <textarea
                  type="text"
                  className="form-control  myinput"
                  rows="25"
                  // value={campaign.htmlEditor}
                  // onChange={(e) => {
                  //   setCampaign({ ...campaign, htmlEditor: e.target.value });
                  // }}
                /> */}
              </div>
            </div>
            {/* <Editor
            // initialContentState={rawHtml}
            // editorState={EditorState.createWithContent(convertFromRaw(initVals.htmlcontent))}
            // initialContentState={draftToHtml(convertToRaw(initVals.htmlcontent))}
            // contentState={draftToHtml_(initVals.htmlcontent)}
            // editorState={editDraftToHtml(initVals.htmlcontent)}
            // ref={editorRef}
            // readOnly={readOnly}
            // placeholder={t('compose.email.input')}
            placeholder="Enter lesson content here"
            onEditorStateChange={onEditorStateChange}
          /> */}
          </div>
        </div>
      </Form>
    </>
  );
};

export default NewCampaign;
