import React, { useRef, useState } from "react";
import Package from "./Package";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import UploadService from "../../../../services/uploadService";
import { toast } from "react-toastify";
import { Form, Input, Select } from "antd";
import APP_USER from "../../../../services/APP_USER";
import CourseAddon from "./CourseAddon";
import { Editor } from "@tinymce/tinymce-react";
import ContentEditor from "../../../components/ContentEditor";
// import "https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js";

const CourseInfo = ({ handleChange, initVals, form }) => {
  const { categories, instructors } = useSelector((state) => state.general);
  const { userRl } = useSelector((s) => s.auth);

  const isInst = userRl == APP_USER.instructor;

  const [base64file, setbase64file] = useState("");
  const uploadFile = async ({ target: { files } }) => {
    // const form = new FormData()
    // form.append('image', target.files[0])
    // const {
    //   data: { url },
    // } = await UploadService.uploadToServer(form)
    // handleChange({ image: url })
    // toast.success('image uploaded')

    // const result = await ImageToBase64(files[0]).catch((e) => Error(e));
    // if (result instanceof Error) {
    //   console.error("E//rror: ", result.message);
    //   return;
    // }

    handleChange({ files: files[0] });
    //setbase64file(result);
  };

  const ImageToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const editorRef = useRef(null);
  const submitText = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  // const [form] = Form.useForm();
  const onEditorChange = (e) => {
    const editorContent = e.target.getContent();
    // console.log(editorContent);
    handleChange({ description: editorContent });
    form.setFieldsValue({ description: editorContent });
  };

  return (
    <Row className="">
      <Col md={6} className="">
        <h5>
          <b>Course information</b>
        </h5>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" rules={[{ required: true }]}></Form.Item>
        <div className="mb-4. .pb-3 pl-5. p-relative " style={{ top: -15 }} placeholder="text here">
          <ContentEditor
            //
            onInit={(evt, editor) => (editorRef.current = editor)}
            onChange={onEditorChange}
            initialValue={initVals?.description}
          />
          <Form.Item className=" p-relative " style={{ top: -20 }} name="description" rules={[{ required: true }]}>
            {/* <Input.TextArea /> */}
          </Form.Item>
        </div>

        <Form.Item label="Category" name="cateId" /*name="category"*/ rules={[{ required: true }]}>
          <Select defaultValue={"Please select a Category"}>
            {categories?.map((course, index) => (
              <Select.Option key={index} value={course._id}>
                {course.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {!isInst && (
          <Form.Item label="Instructor" name={"instId"} /*name="instructor"*/ rules={[{ required: true }]}>
            <Select defaultValue={"Please select a Instructor"}>
              {instructors?.map((course, index) => (
                <Select.Option key={index} value={course._id}>
                  {course.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {/* <Row className="align-items-center">
          <Col md={3} xs={4} className="text-sm-end">
            <p>Cover image</p>
          </Col>
          <Col md={9} xs={8} className="">
            <input class="form-control" type="file" accept="image/*" multiple={false} onChange={file => uploadFile(file)} />
          </Col>
        </Row> */}
        <Form.Item label="Cover image">
          <input class="form-control" type="file" accept="image/*" multiple={false} onChange={(file) => uploadFile(file)} />
          {/* <Input type="file" class="form-control" type="file" accept="image/*" multiple={false} onChange={file => uploadFile(file)} /> */}
          {/* <input class="form-control" type="file" accept="image/*" multiple={false} onChange={file => uploadFile(file)} /> */}
        </Form.Item>
        <Form.Item label="Course Status" name="courseStatus" rules={[{ required: true }]}>
          <Select defaultValue={"Please select status"}>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Disabled</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col md={6} className="pl-3">
        <Package handleChange={handleChange} initVals={initVals} />
        {/* <CourseAddon handleChange={handleChange} initVals={initVals} /> */}
      </Col>
    </Row>
  );
};

export default CourseInfo;
