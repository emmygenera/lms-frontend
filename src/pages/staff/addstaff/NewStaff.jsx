import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import qs from "query-string";

import PicturesWall from "../../../components/upload";
import CountryList from "../../../components/CountriesDropdown";

import { getCountryName } from "../../../utils/getCities";

import Staff from "../../../services/staff";
import Role from "../../../services/role";

import "./newstaff.scss";
import { EmjsF, toCapitalize } from "../../../applocal";
import { toast } from "react-toastify";
import LoadingAnim from "../../../components/LoadingAnim";

const NewStaff = ({ history, location }) => {
  // const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { data: qsData } = qs.parse(location?.search, { parseFragmentIdentifier: true });
  const paramData = EmjsF(qsData).parse();

  // const initVals = params && params.data ? JSON.parse(params.data) : null;
  const [attachments, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [is_init, setis_init] = useState(false);
  const [roles, setRoles] = useState([]);
  const [initVals, setinitVals] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    roleId: "",
    roleName: "",
    address: "",
    notes: "",
  });

  async function getRoles() {
    const {
      data: { data },
    } = await Role.getAll();
    setRoles(data);
  }
  const addNew = (vals) => {
    vals.country = getCountryName(vals.country);
    vals.roleName = initVals.roleName;
    setLoading(true);
    paramData
      ? Staff.updateOne({ ...vals, files: attachments, id: paramData })
          .then((result) => history.push("/staff"))
          .finally(() => setLoading(false))
      : Staff.add({ ...vals, files: attachments })
          .then((result) => history.push("/staff"))
          .finally(() => setLoading(false));
  };

  function getStaffData() {
    Staff.getOne(paramData)
      .then(({ data: { data: staffData } }) => {
        const { roleId, name, phone, email, address, notes } = staffData;
        setinitVals({ name, phone, email, address, notes, password: "", roleId: roleId?._id });
      })
      .catch(() => toast.error("unable to get staff record"))
      .finally(() => setis_init(true));
    // console.log(staffData);
    // setData(courseData);
  }
  React.useEffect(() => {
    getRoles();
    if (!paramData) {
      setis_init(true);
    } else getStaffData();
  }, []);

  if (!is_init) {
    return <LoadingAnim />;
  }
  const onSetRoleName = (v) => {
    const userRl_ = roles.filter((itm) => itm._id == v).reduceRight((l, r) => r, {});
    setinitVals((s) => ({ ...s, roleName: userRl_?.roleName }));
  };
  // console.log("initVals:", initVals);

  return (
    <>
      <div className="shadow-sm p-3 row mt-md-5">
        <div className="col-md-5 mt-sm-5">
          <h5 className="offset-sm-4 mb-3">
            <b>Staff Information</b>
          </h5>
          <Form name="wrap" initialValues={initVals} labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew}>
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
            <Form.Item label="Role" name="roleId" rules={[{ required: true }]}>
              <Select onChange={onSetRoleName} defaultValue={"Please select a role"}>
                {roles.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {toCapitalize(item.roleName)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: false }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Note" name="notes" rules={[{ required: false }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-2 offset-sm-4" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {paramData ? "Update" : "Add"}
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
