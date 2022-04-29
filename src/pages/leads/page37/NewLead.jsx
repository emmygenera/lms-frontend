import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { toCapitalize } from "../../../applocal";
import CountryList from "../../../components/CountriesDropdown";
import LoadingAnim from "../../../components/LoadingAnim";
import Lead from "../../../services/leads";
import qs from "query-string";
import { toast } from "react-toastify";
import Courses from "../../../services/courses";
import leadStatus from "../leadStatus.json";

const NewLead = ({ history, location }) => {
  const [initVals, setInitVals] = React.useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    address: "",
    status: "",
    course: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [is_init, setis_init] = useState(false);

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });

  async function getLeadsData() {
    const {
      data: { data: tipsData },
    } = await Lead.getSingle(paramData).catch(() => toast.error("unable to get Leads data"));
    setInitVals(tipsData);
    setis_init(true);
  }
  async function getCourses() {
    const {
      data: { data: tipsData },
    } = await Courses.getAll(paramData).catch(() => toast.error("unable to get Leads data"));
    setCourses(tipsData);
  }

  const addNew = (vals) => {
    setLoading(true);
    const sd = paramData ? "update" : "add";
    Lead[sd]({ data: vals, id: paramData })
      .then((result) => {
        history.push("/leads");
        // console.log(result)
      })
      .finally(() => setLoading(false));
  };
  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } else getLeadsData();
    getCourses();
  }, []);
  if (!is_init) {
    return <LoadingAnim />;
  }

  return (
    <>
      <div className="shadow-sm p-3 row mt-md-5">
        <div className=" col-md-7">
          <h5 className="offset-sm-3 mb-3 mt-5">
            <b>Lead Information</b>
          </h5>
          <style jsx>
            {`
              .ant-form-item-label.ant-form-item-label-left {
                text-align: right;
              }
            `}
          </style>
          <Form name="wrap" className="resize-450" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew} initialValues={initVals}>
            <Form.Item label="Name" className="text-right" name="name" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <CountryList className="myinput" isRequired={false} />

            <Form.Item label="Please a Course" name="courseId" rules={[{ required: true }]}>
              <Select className="myinput" defaultValue={"Select a course"}>
                {courses.map((item) => (
                  <Select.Option value={item._id}>{toCapitalize(item.name)}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
              <Select className="myinput" defaultValue={"Select status"}>
                {leadStatus.map((itm) => (
                  <Select.Option key={itm.value} value={itm.value}>
                    {itm.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: false }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Private Notes" name="notes" rules={[{ required: false }]}>
              <Input.TextArea className="myinput" />
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-4 offset-sm-4 btnupdate" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {paramData ? "Update Lead" : "Add Lead"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* <Row className="shadow-sm  p-4" style={{ backgroundColor: "#FFFFFF" }}>
                <Col md={4} sm={6} className="offset-sm-1 mt-4">
                    <h5 style={{ paddingTop: "50px" }}>
                        <b>Lead Information</b>
                    </h5>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">
                                Name
                            </label>
                            <input type="text" class="form-control" id="name" />
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Phone
                            </label>
                            <input type="text" class="form-control" id="discription" />
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Email
                            </label>
                            <input type="text" class="form-control" id="discription" />
                        </div>

                        <div class="mb-3">
                            <label for="country" class="form-label">
                                Country
                            </label>
                            <select className="form-control form-select" id="country">
                                <option value="" selected>
                                    Please select a Country
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">
                                City
                            </label>
                            <select className="form-control form-select" id="city">
                                <option value="" selected>
                                    Please select a City
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Address
                            </label>
                            <input type="text" class="form-control" id="discription" />
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">
                                Course
                            </label>
                            <select className="form-control form-select" id="city">
                                <option value="" selected>
                                    Please select a Course
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Private Notes
                            </label>
                            <textarea class="form-control" id="discription" />
                        </div>

                        <button class="btn " style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            Add
                        </button>
                        <button class="btn  ms-2" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            Update
                        </button>
                    </form>
                </Col>
            </Row> */}
    </>
  );
};

export default NewLead;
