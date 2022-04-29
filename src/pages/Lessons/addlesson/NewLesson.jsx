import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./addlesson.scss";
import "antd/dist/antd.css";
import { Upload, message } from "antd";
import PicturesWall from "./NewDrag";
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { API_URL } from "../../../services/config.json";
import { useSelector } from "react-redux";
import lesson from "../../../services/lesson";
import qs from "query-string";
import { EditorState, Modifier, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { stateFromHTML } from "draft-js-import-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Spinner } from "react-bootstrap";
import { EmjsF, htmlDecode, htmlEncode, jsonValue, objectRemove, object_entries, stripTags } from "../../../applocal";
import http from "../../../services/http";
import { toast } from "react-toastify";
import LoadingAnim from "../../../components/LoadingAnim";
import Courses from "../../../services/courses";
import ContentEditor from "../../components/ContentEditor";
const { Dragger } = Upload;

const NewLesson = ({ history, location }) => {
  const { data: qsData, cid } = qs.parse(location?.search, { parseFragmentIdentifier: true });
  const paramData = EmjsF(qsData).parse();

  // console.log({ paramData, cid });

  const [is_init, setis_init] = useState(false);
  const [paramVal, setParamVal] = useState({});
  const [CourseSections, setCourseSections] = useState([]);
  // const [data, setData] = useState({});

  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [Fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState([]);
  // const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [editorState, setEditorState] = useState("");
  const [fileList, setFileList] = useState([]);

  // const onEditorStateChange = (string) => {
  //  // let editorSourceHTML = draftToHtml(convertToRaw(event.getCurrentContent()));
  //   // setEditorState(editorSourceHTML);
  //   setEditorState(stripTags());
  // };
  // const onEditorPaste = (string) => {
  //  // let editorSourceHTML = draftToHtml(convertToRaw(event.getCurrentContent()));
  //   // setEditorState(editorSourceHTML);
  //   setEditorState(stripTags(string));
  // };

  const ImageToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const props = {
    name: "file",
    multiple: true,
    // accept: "image/*",
    accept: "application/msword,application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*",
    // action: `${API_URL}upload/upload-`,
    onChange(info) {
      // const { status } = info.file;
      // if (status !== "uploading") {
      //   const _data = { ...data };
      //   _data.urls.push(info.file.response.url);
      //   setData(_data);
      // }
      // if (status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove: (file) => {
      setFileList((fileList) => fileList.filter((flist) => file.uid !== flist.uid));
    },
    beforeUpload: async (file) => {
      setFileList((state) => [...state, file]);
      // const base64 = await ImageToBase64(file).catch(console.error);
      //console.log();
      //setData({ file: base64 });
      /* update state here */
      return false;
    },
  };
  // console.log(fileList);
  // const { courses } = useSelector((state) => state.general);
  // let initVals = (params && params.data && { ...JSON.parse(params.data) }) || null;
  let initVals = paramVal;
  const isHasVals = object_entries(paramVal).length > 0;
  // console.log(object_entries({ _s: "s", ee: "fx" }));
  let rawHtml = "";

  if (isHasVals && initVals.course) {
    const contentBlocks = htmlToDraft(initVals.content || "");
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    rawHtml = convertToRaw(contentState);
    initVals = { ...initVals, course: initVals.course._id };
  }
  function getCourses() {
    setFetching(true);
    Courses.getAll()
      .then(({ data: { data } }) => {
        setCourses(data.length > 0 ? data : "no_courses");
      })
      .finally(() => setFetching(false));
  }

  const onEditorChange = (e) => {
    const editorContent = e.target.getContent();
    // console.log(editorContent);
    // se({ description: editorContent });
    form.setFieldsValue({ description: editorContent });
  };

  const createLesson = (values) => {
    setLoading(true);
    // values = { ...data, ...values, html: editorState };
    values = { ...data, ...values, html: htmlEncode(values.html) };
    const formdata = new FormData();
    EmjsF(fileList).objList(({ key, value }) => {
      // console.log(key, value);
      // if(["images", "isDeleted", "_id", "image", "createdAt", "updatedAt"].includes());
      formdata.append("files", value);
    });
    EmjsF(objectRemove(values, ["images", "isDeleted", "_id", "image", "createdAt", "updatedAt"])).objList(({ key, value }) => {
      formdata.append(key, value);
    });
    if (isHasVals && initVals._id) {
      lesson
        .update(initVals._id, formdata)
        .then((result) => {
          history.push(cid ? "viewCourse?data=" + cid : "/lessons");
        })
        .finally(() => setLoading(false))
        .catch(() => toast.error("Unable to process request. Try again!"));
    } else
      lesson
        .add(formdata)
        .then(({ result }) => {
          history.push(cid ? "viewCourse?data=" + cid : "/lessons");
        })
        .finally(() => setLoading(false))
        .catch(() => toast.error("Unable to process request. Try again!"));
  };

  async function getLessonData() {
    const {
      data: { data: courseData },
    } = await http.get("lessions/single/" + paramData).catch(() => toast.error("unable to get lesson data"));

    setParamVal({ ...courseData, html: htmlDecode(courseData.html) });
    setData(courseData);
    setis_init(true);
  }

  function courseSectionById(id) {
    const cs = courses.filter((itm) => itm._id == id).reduce((l, r) => r, {})?.course_sections;
    const vl = EmjsF(cs).parse();
    // console.log(vl);
    setCourseSections(vl);
  }

  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } else getLessonData();
    getCourses();
  }, []);

  React.useEffect(() => {
    if (cid || data?.courseId) {
      courseSectionById(cid || data?.courseId);
    }
  }, [courses]);

  if (courses == "no_courses") {
    return <h4 className="p-5 text-center">No courses Available</h4>;
  }

  if (!is_init || Fetching) {
    return <LoadingAnim />;
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Home<span style={{ marginLeft: "10px" }}>/</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="courses">
                  Courses<span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="newLesson">
                  {isHasVals ? "Update" : "Add New"} Lesson
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h2 className="mt-3">
        <b> {isHasVals ? "Update" : "Add New"} Lesson</b>
      </h2>

      <Form initialValues={{ ...initVals, ...(cid ? { courseId: cid } : {}) }} name="wrap" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" form={form} onFinish={createLesson}>
        <div className="shadow-sm p-3 row mt-md-5">
          <div className="col-md-6">
            <h5 className="offset-sm-1 my-5">
              <b>Lesson Information</b>
            </h5>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true }]}>
              {/* <TextArea /> */}
              {/* <div
                contentEditable
                className="b-dark-1 p-3"
                onInput={(e) => {
                  console.log(e.currentTarget.innerHTML);
                }}
                dangerouslySetInnerHTML={{ __html: initVals.description }}
              />*/}
              <ContentEditor
                //
                // onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={onEditorChange}
                initialValue={initVals?.description}
              />
            </Form.Item>

            <Form.Item label="Course" name="courseId" rules={[{ required: true }]}>
              <Select showSearch optionFilterProp="children" defaultValue={"Please select a course"} onChange={courseSectionById}>
                {courses.map((course) => (
                  <Select.Option key={course._id} value={course._id}>
                    {course.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item label="Section" name="section" rules={[{ required: true }]}>
              <Select showSearch optionFilterProp="children" defaultValue={"Please select a section"}>
                {CourseSections.map((value, idx) => (
                  <Select.Option key={idx} value={value?.name}>
                    {value?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item label="Order" name="order" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            {/* <Form.Item label="Available Addons" name="avl_addons" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lessson Type" name="type" rules={[{ required: true }]}>
              <Input />
            </Form.Item> */}
            <Form.Item>
              <Button htmlType="submit" id="mybtnupdate" loading={loading}>
                {" "}
                {isHasVals ? "Update" : "Add New"}
              </Button>
            </Form.Item>
            {/* </Form> */}
          </div>
          <div className="col-md-5 ms-5">
            <h5 className="my-5">
              <b>Lesson Content</b>
            </h5>
            <div className="fz-2" style={{ border: "1px solid #d9d9d9" }}>
              {/* <Editor
              initialContentState={rawHtml}
              // ref={editorRef}
              // readOnly={readOnly}
              // placeholder={t('compose.email.input')}
              placeholder={<p style={{ paddingLeft: 1 }}>Enter lesson content here</p>}
              onEditorStateChange={onEditorStateChange}
              className="p-4"
              editorStyle={{ border: "1px solid #d9d9d9", padding: 15, minHeight: 200 }}
            /> */}

              <Form.Item name="html" rules={[{ required: true }]}>
                <textarea
                  //
                  placeholder={"Embed lesson content here"}
                  // onChange={onEditorStateChange}
                  className="p-4"
                  style={{ border: "1px solid #fff", padding: 15, minHeight: 200, width: 100 + "%" }}
                ></textarea>
              </Form.Item>
            </div>

            <div className="row mb-2">
              <div className="col-sm-11 mt-5">{/* <textarea className=" form-control myinput" rows="12" placeholder="[HTML EDITOR HERE]" /> */}</div>
            </div>
            {/* <h5 className="" style={{ marginTop: "200px" }}>
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
            </div> */}
          </div>
        </div>
      </Form>
    </>
  );
};

export default NewLesson;
