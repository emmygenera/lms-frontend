import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import qs from 'query-string';

import PicturesWall from "../../../components/upload";
import CountryList from "../../../components/CountriesDropdown";

import { getCountryName } from "../../../utils/getCities";

import Staff from "../../../services/staff";

import "./newstaff.scss";

const NewStaff = ({ history, location }) => {

  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  const initVals = params && params.data ? JSON.parse(params.data) : null;
  const [attachments, setImages] = useState([]);
  const [loading, setLoading] = useState(false)

  const addNew = (vals) => {
    vals.country = getCountryName(vals.country);
    setLoading(true)
    initVals ? Staff.updateOne({ ...vals, attachments, id: initVals._id }).then((result) => history.push("/staff")).finally(() => setLoading(false)) :
      Staff.add({ ...vals, attachments }).then((result) => history.push("/staff")).finally(() => setLoading(false))
  };

  return (
    <>
      <div className="shadow-sm p-3 row mt-md-5">
        <div className="col-md-5 mt-sm-5">
          <h5 className="offset-sm-4 mb-3">
            <b>Staff Information</b>
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
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <CountryList />
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Role" name="role" rules={[{ required: true }]}>
              <Select defaultValue={"Please select a role"}>
                <Select.Option value={"A"}>A</Select.Option>
                <Select.Option value={"B"}>B</Select.Option>
                <Select.Option value={"C"}>C</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Private Note" name="privateNotes" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                className='mt-2 col-2 offset-sm-4'
                type="primary"
                danger
                backgroundColor={'red'}
                htmlType="submit"
                loading={loading}
                id="mybtnupdate"
              >
                {initVals ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>

        </div>
        <div className="col-md-7 mt-sm-5">
          <h5 className="offset-sm-2 mb-3">
            <b>Staff Attachments</b>
          </h5>
          <div className="row">
            <div className="col-8 py-5 ps-3 offset-sm-2  mt-2 " style={{ backgroundColor: "#F2F4F5" }}>
              <div className="ps-5 align-items-center justify-content-center">
                <PicturesWall setImages={setImages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStaff;
