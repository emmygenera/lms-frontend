import React, { useState } from "react";
import "./newtip.scss";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { message, Form, Input, Select, Button } from "antd";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useSelector } from "react-redux";
import PicturesWall from "../../../components/upload";
import TIpService from "../../../services/TipService";
import { toast } from "react-toastify";
import { EditorState, Modifier, convertToRaw, ContentState } from 'draft-js'


const Newtip = ({ history }) => {
  const [editorState, setEditorState] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { orders } = useSelector(state => state.general);

  const handleFinish = (vals) => {
    vals.attachments = images;
    vals.content = editorState;
    if (images.length === 0) return toast.error("please attach some attachments")
    setLoading(true)
    TIpService.add(vals).then(({ data }) => {
      history.goBack();
    }).catch((err) => {

    }).finally(() => setLoading(false));
  }

  const onEditorStateChange = (event) => {
    let editorSourceHTML = draftToHtml(convertToRaw(event.getCurrentContent()))
    setEditorState(editorSourceHTML);
  };

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

      <div className="shadow-sm p-3 row mt-md-5">
        <div className="mt-5 col-md-6">
          <h5 className="offset-sm-2 mb-5">
            <b>Tip Information</b>
          </h5>
          <Form
            name="wrap"
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            layout="horizontal"
            onFinish={handleFinish}
          // initialValues={initVals}
          >
            <Form.Item label="Tip Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tip Discription" name="description" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Order" name="order" rules={[{ required: true }]}>
              <Select defaultValue={"Please select an order"}>
                {orders.map((order, index) => <Select.Option key={index} value={order._id}>{order.name}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button loading={loading} htmlType="submit" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", fontSize: "1em" }}>ADD NEW</Button>
            </Form.Item>
          </Form>
          <span className="col-2 offset-sm-4">
          </span>
        </div>
        <div className="col-md-5 ms-5">
          <h5 className="my-5">
            <b>Tip Content</b>
          </h5>
          <div className="row mb-2">
            <div className="col-sm-11 mt-4">
              <Editor
                // initialContentState={rawHtml}
                // ref={editorRef}
                // readOnly={readOnly}
                // placeholder={t('compose.email.input')}
                placeholder="Enter lesson content here"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <PicturesWall setImages={setImages} />
        </div>
      </div>


    </>
  );
};

export default Newtip;
