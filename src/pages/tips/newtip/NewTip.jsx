import React, { useState } from "react";
import "./newtip.scss";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { message, Form, Input, Select, Button } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import PicturesWall from "../../../components/upload";
import TIpService from "../../../services/TipService";
import { toast } from "react-toastify";
import { EditorState, Modifier, convertToRaw, ContentState, convertFromRaw } from "draft-js";
import TextArea from "antd/lib/input/TextArea";
import qs from "query-string";
import { baseUrl, Get, htmlEncode } from "../../../applocal";
import LoadingAnim from "../../../components/LoadingAnim";
import htmlToDraft from "html-to-draftjs";
import editDraftToHtml from "../../../services/editDraftToHtml";
import ContentEditor from "../../components/ContentEditor";

const Newtip = ({ history, location }) => {
  const [editorState, setEditorState] = useState("");
  const [images, setImages] = useState([]);
  const [initVals, setInitVals] = useState({ title: "", description: "", order: "", htmlcontent: "" });
  const [loading, setLoading] = useState(false);
  const [is_init, setis_init] = useState(false);
  const [form] = Form.useForm();

  const { orders } = useSelector((state) => state.general);

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });

  async function getTipsData() {
    const {
      data: { data: tipsData },
    } = await Get({ url: "tips/single/" + paramData }).catch(() => toast.error("unable to get course data"));
    setInitVals(tipsData);
    setis_init(true);
  }

  const handleFinish = (vals) => {
    if (images.length != 0) vals.files = images;
    // if (editorState) vals.htmlcontent = editorState;
    if (!paramData && images.length === 0) return toast.error("please attach some attachments");
    setLoading(true);

    const qs = !paramData ? "add" : "update";

    TIpService[qs]({ data: { ...vals, htmlcontent: htmlEncode(vals.htmlcontent) }, id: paramData })
      .then(({ data }) => {
        // history.goBack();
        window.location.replace(baseUrl("#/tips"));
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const onEditorStateChange = (event) => {
    let editorSourceHTML = draftToHtml(convertToRaw(event.getCurrentContent()));
    setEditorState(editorSourceHTML);
  };

  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } else getTipsData();
  }, []);

  if (!is_init) {
    return <LoadingAnim />;
  }

  const onEditorChange = (e) => {
    const editorContent = e.target.getContent();
    // console.log(editorContent);
    // se({ description: editorContent });
    form.setFieldsValue({ description: editorContent });
  };
  // console.log(draftToHtml_(initVals.htmlcontent));
  return (
    <>
      <nav class="ps-3 navbar navbar-expand-lg navbar-light bg-light">
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
                  Tips<span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  View Tips
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h5 className="ms-3 mt-0">
        <b>Add a New Tip</b>
      </h5>

      <Form form={form} name="wrap" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={handleFinish} initialValues={initVals}>
        <div className="shadow-sm p-3 row mt-md-5">
          <div className="mt-5 col-md-6">
            <h5 className="offset-sm-2 mb-5">
              <b>Tip Information</b>
            </h5>
            <Form.Item label="Tip Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tip Discription" name="description" rules={[{ required: true }]}>
              {/* <TextArea rows={6} />  */}
              <ContentEditor
                //
                // onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={onEditorChange}
                initialValue={initVals?.description}
              />
            </Form.Item>
            {/* <Form.Item label="Order" name="order" rules={[{ required: true }]}>
              <Select defaultValue={"Please select an order"}>
                {orders.map((order, index) => (
                  <Select.Option key={index} value={order._id}>
                    {order.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item> */}
            <div className="col-12 p-0">
              <Form.Item label="Tip Cover Image">
                <PicturesWall setImages={setImages} />
              </Form.Item>
            </div>
            <Form.Item>
              <Button loading={loading} htmlType="submit" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", fontSize: "1em" }}>
                {paramData ? "Update" : "ADD NEW"}
              </Button>
            </Form.Item>
            {/* </Form> */}
            <span className="col-2 offset-sm-4"></span>
          </div>
          <div className="col-md-5 ms-5">
            <h5 className="my-5">
              <b>Tip Content</b>
            </h5>
            <div className="row mb-2">
              <div className="col-sm-12 mt-/4 p-0 fz-2" style={{ border: "1px solid #d9d9d9" }}>
                <Form.Item name="htmlcontent" rules={[{ required: true }]}>
                  <textarea
                    //
                    placeholder={"Embed tip content here"}
                    // onChange={onEditorStateChange}
                    className="p-4"
                    style={{ border: "0px solid #fff", padding: 15, minHeight: 200, width: 100 + "%" }}
                  ></textarea>
                </Form.Item>
                {/* <Editor
                  // initialContentState={rawHtml}
                  // editorState={EditorState.createWithContent(convertFromRaw(initVals.htmlcontent))}
                  // initialContentState={draftToHtml(convertToRaw(initVals.htmlcontent))}
                  // contentState={draftToHtml_(initVals.htmlcontent)}
                  // editorState={editDraftToHtml(initVals.htmlcontent)}
                  // ref={editorRef}
                  // readOnly={readOnly}
                  // placeholder={t('compose.email.input')}
                  placeholder="Embed tip content here"
                  onEditorStateChange={onEditorStateChange}
                  editorStyle={{ padding: 15, minHeight: 200 }}
                /> */}
              </div>
            </div>
          </div>
          <div className="row">{/* <PicturesWall setImages={setImages} /> */}</div>
        </div>
      </Form>
    </>
  );
};

export default Newtip;
