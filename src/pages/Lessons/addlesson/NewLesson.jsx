import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./addlesson.scss";
import "antd/dist/antd.css";
import { Upload, message } from "antd";
import PicturesWall from "./NewDrag";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { API_URL } from "../../../services/config.json"
import { useSelector } from "react-redux";
import lesson from "../../../services/lesson";
import qs from "query-string";
import { EditorState, Modifier, convertToRaw, ContentState } from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { stateFromHTML } from 'draft-js-import-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const { Dragger } = Upload;

const NewLesson = ({ history, location }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState({ urls: [] });
  const [loading, setLoading] = useState(false);
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [editorState, setEditorState] = useState('');

  const onEditorStateChange = (event) => {
    let editorSourceHTML = draftToHtml(convertToRaw(event.getCurrentContent()))
    setEditorState(editorSourceHTML);
  };

  const props = {
    name: "file",
    multiple: true,
    accept: "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*",
    action: `${API_URL}upload/upload-`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        const _data = { ...data };
        _data.urls.push(info.file.response.url);
        setData(_data);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const { courses } = useSelector(state => state.general);
  let initVals = params && params.data && { ...JSON.parse(params.data) } || null;

  let rawHtml = "";

  if (initVals && initVals.course) {
    const contentBlocks = htmlToDraft(initVals.content || "")
    const contentState = ContentState.createFromBlockArray(contentBlocks)
    rawHtml = convertToRaw(contentState)
    initVals = { ...initVals, course: initVals.course._id }
  };

  const createLesson = (values) => {
    setLoading(true)
    values = { ...values, urls: data.urls, content: editorState };
    if (initVals && initVals._id) {
      lesson.update(initVals._id, values).then((result) => {
        history.push('/lessons')
      }).finally(() => setLoading(false))
    }
    else
      lesson.add(values).then(({ result }) => {
        history.push('/lessons')
      }).finally(() => setLoading(false))
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home<span style={{ marginLeft: "10px" }}>/</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  Courses<span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  New Lesson
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h5 className="mt-0">
        <b>Add New Lesson</b>
      </h5>

      <div className="shadow-sm p-3 row mt-md-5">
        <div className="col-md-6">
          <h5 className="offset-sm-1 my-5">
            <b>Lesson Information</b>
          </h5>
          <Form
            initialValues={initVals}
            name="wrap"
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            layout="horizontal"
            form={form}
            onFinish={createLesson}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true }]}>
              <TextArea />
            </Form.Item>
            <Form.Item label="Course" name="course" rules={[{ required: true }]}>
              <Select defaultValue={"Please select a course"}>
                {courses.map((course) => (<Select.Option value={course._id}>{course.name}</Select.Option>))}
              </Select>
            </Form.Item>
            <Form.Item label="Section" name="section" rules={[{ required: true }]}>
              <Select defaultValue={"Please select a section"}>
                {["A", "B", "C", "D"].map((value) => (<Select.Option value={value}>{value}</Select.Option>))}
              </Select>
            </Form.Item>
            <Form.Item label="Order" name="order" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Available Addons" name="addOns" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lessson Type" name="type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item >
              <Button htmlType="submit" id="mybtnupdate" loading={loading} > {initVals ? "Update" : "Add New"}</Button>
            </Form.Item>
          </Form>


        </div>
        <div className="col-md-5 ms-5">
          <h5 className="my-5">
            <b>Lesson Content</b>
            <div style={{ border: '1px solid #d9d9d9' }} >
              <Editor
                initialContentState={rawHtml}
                // ref={editorRef}
                // readOnly={readOnly}
                // placeholder={t('compose.email.input')}
                placeholder="Enter lesson content here"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </h5>
          <div className="row mb-2">
            <div className="col-sm-11 mt-5">

              {/* <textarea className=" form-control myinput" rows="12" placeholder="[HTML EDITOR HERE]" /> */}
            </div>
          </div>
          <h5 className="" style={{ marginTop: "200px" }}>
            <b>Lesson Attachments</b>
          </h5>
          <div className="mt-5 py-5 px-5" style={{ backgroundColor: "#F2F4F5" }}>
            <Dragger {...props} style={{ backgroundColor: "white", border: "1px doted gray" }}>
              <p className="ant-upload-drag-icon">
                <i class="bi bi-cloud-upload" style={{ fontSize: "2.5em" }}></i>
              </p>
              <p className="ant-upload-text" style={{ fontSize: "0.9em" }}>
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
        </div>
      </div>

    </>
  );
};

export default NewLesson;
