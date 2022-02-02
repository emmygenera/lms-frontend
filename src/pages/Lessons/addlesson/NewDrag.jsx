import React from "react";
import "antd/dist/antd.css";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./addlesson.scss";

import { API_URL } from "../../../services/config.json"

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: "",
        previewTitle: "",
        fileList: [
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload style={{ display: "flex" }} accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*" action={`${API_URL}upload-`} listType="picture-card" fileList={fileList} onPreview={this.handlePreview} onChange={this.handleChange}>
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal style={{ display: "flex" }} visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
                    {/* <img alt="example" style={{ width: "50%" }} src={previewImage} /> */}
                </Modal>
            </>
        );
    }
}

export default PicturesWall;
