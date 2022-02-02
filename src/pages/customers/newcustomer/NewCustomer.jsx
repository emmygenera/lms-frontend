import React from "react";
import { Link } from "react-router-dom";
import "./newcustomer.scss";
import { Col, Row } from "react-bootstrap";
import { Upload, message, Input, Form, Button } from "antd";
import Customer from "../../../services/customer";
import { toast } from "react-toastify";
import qs from "query-string";
import CountryList from "../../../components/CountriesDropdown";
import PicturesWall from "../../../components/upload";
import { useState } from "react";
import { getCountryName } from "../../../utils/getCities";
const { Dragger } = Upload;

const NewCustomer = ({ history, location }) => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [attachments, setImages] = useState([]);
  const [loading, setLoading] = useState(false)

  let initVals = params && params.data && JSON.parse(params.data);

  const addNew = (customer) => {
    setLoading(true)
    customer.country = getCountryName(customer.country);
    if (initVals) {
      Customer.update(initVals._id, { ...customer, attachments }).then(() => {
        toast.success("Successfully Updated");
        history.push("/customers");
      }).finally(() => setLoading(false));
    } else {
      Customer.add({ ...customer, attachments }).then(() => {
        toast.success("Successfully Add New Customer");
        history.push("/customers");
      }).finally(() => setLoading(false));
    }
  };

  return (
    <>
      <div className="shadow-sm p-3 row mt-md-5">
        <div className="col-md-5">
          <h5 className="offset-sm-3 mb-3">
            <b className="mt-5">Customer Information</b>
          </h5>
          <Form
            name="wrap"
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            layout="horizontal"
            onFinish={addNew}
            initialValues={initVals}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <CountryList />
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address 2" name="address2" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Private Note" name="privateNotes" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} id="mybtnupdate" className="col-2 offset-sm-4" htmlType="submit">
                {initVals ? "Update" : "Add New"}
              </Button>
            </Form.Item>
          </Form>

        </div>
        <div className="col-md-7 ">
          <h5 className="offset-sm-1 mb-3">
            <b>Courses</b>
          </h5>
          <div className="row mb-2">
            <p className=" col-sm-3 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
              Live Trading Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select className="col-sm-8 form-select form-control  myinput">
                <option value="" selected>
                  Active
                </option>
                <option value="">Expiry</option>
              </select>
            </div>
            <p className=" col-sm-1  mt-2">Expiry</p>
            <div className="col-sm-3">
              <input className="col-sm-12  form-control myinput" value="Active"></input>
            </div>
            <p className=" col-sm-1 mt-2">Pause</p>
          </div>
          <div className="row mb-2 mt-1">
            <p className=" col-sm-3 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
              Monetary Rules Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select className="col-sm-8 form-select form-control  myinput">
                <option value="" selected>
                  Expired
                </option>
                <option value="">Expiry</option>
              </select>
            </div>
            <p className=" col-sm-1  mt-2">Expiry</p>
            <div className="col-sm-3">
              <input className="col-sm-12  form-control myinput" value="Expired"></input>
            </div>
            <p className=" col-sm-1 mt-2">Resume</p>
          </div>
          <div className="row mb-2 mt-1">
            <p className=" col-sm-3 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
              Angular Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select className="col-sm-8 form-select form-control  myinput">
                <option value="" selected>
                  Complementry
                </option>
                <option value="">Expiry</option>
              </select>
            </div>
            <p className=" col-sm-1  mt-2">Expiry</p>
            <div className="col-sm-3">
              <input className="col-sm-12  form-control myinput" value="Complementry"></input>
            </div>
            <p className=" col-sm-1 mt-2">Pause</p>
          </div>
          <div className="row mb-2 mt-1">
            <p className=" col-sm-3 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
              TS Script Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select className="col-sm-8 form-select form-control  myinput">
                <option value="" selected>
                  Active
                </option>
                <option value="">Expiry</option>
              </select>
            </div>
            <p className=" col-sm-1  mt-2">Expiry</p>
            <div className="col-sm-3">
              <input className="col-sm-12  form-control myinput" value="59 Days"></input>
            </div>
            <p className=" col-sm-1 mt-2">Pause</p>
          </div>
          <div className="mt-3 offset-sm-1">
            <h5>
              <b>Customer Attachments</b>
            </h5>
          </div>
          <div className="row">
            <div className="col-9 py-5 ps-5 offset-sm-1 align-items-center justify-content-center mt-2 " style={{ backgroundColor: "#F2F4F5" }}>
              <div className="ps-5">
                <PicturesWall setImages={setImages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCustomer;
