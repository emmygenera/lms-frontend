import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./orders.scss";
import { Row, Col } from "react-bootstrap";
import { Form, Input, Select, DatePicker, Button } from "antd";
import CountryList from "../../components/CountriesDropdown";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../../services/orders";
import { DateTime, EmjsF, jsonValue, objectOnly, objectRemove, Post, RandomString, split, toCapitalize } from "../../applocal";
import LoadingAnim from "../../components/LoadingAnim";
import Courses from "../../services/courses";
import { setCustomer } from "../../redux/actions/auth";
import { totalCoursePackage } from "../website/customer/CheckOut";
import APP_USER from "../../services/APP_USER";
import { toast } from "react-toastify";
import Customer from "../../services/customer";
import Lead from "../../services/leads";
import onFindCourses from "./components/onFindCourses";

const NewLeadOrder = ({ history }) => {
  // const [data, setData] = useState({});
  // const { courses } = useSelector((state) => state.general);
  const [courses, setCourses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [OrderedCourse, setOrderedCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [userFetching, setUserFetching] = useState(false);
  const [totalTier, setTotalTier] = useState(0);
  const [subTier, setSubTier] = useState(0);
  const [SubscriptionTier, setSubscriptionTier] = useState([]);
  const [userRes, setuserRes] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [userResDone, setuserResDone] = useState(false);
  const [Res, setRes] = useState("");

  const [initialData, setinitialData] = useState({});

  const freePackage = {
    duration: "one_month_free",
    // label: "30 days free",
    price: { usd: "0", jod: "0" },
  };

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const _handleChange = (value) => setData(data => ({ ...data, value }));
  function selectUserOrderAccount(uid) {
    const selectedUser = customers.filter((itm) => itm?._id == uid).reduce((l, r) => r, {});
    const dt = objectOnly(selectedUser, ["name", "email", "phone", "address"]);

    setinitialData({ ...dt, password: "123456", uid });
    form.setFieldsValue({ ...dt, password: "123456", uid });
  }

  function handleUserOrderAccount(data_) {
    if (!initialData?.uid) return toast.error("Please select a lead user");

    setuserRes(true);

    // setAccountName(data_.fname + " " + data_.lname);
    const data = objectRemove(
      {
        ...data_,
      },
      ["course", "subscriptionTier"]
    );
    setRes("");
    Post({ url: "users/add", data, dataType: "json" })
      .then(({ data: { data: _data } }) => {
        // console.log(dt);
        Lead.delete(initialData?.uid);
        processOrder(data_, _data);
      })
      .catch((err) => {
        if (err?.response?.status == 400) setRes(err?.response?.data?.message);
        else toast.error("Oops! Error occured while creating user account... Error: " + err?.response?.statusText);
      })
      .finally(() => {
        setuserRes(false);
      });
  }

  function getCourses(loading = true) {
    setFetching(loading);
    Courses.getAll()
      .then(({ data: { data } }) => {
        setCourses(data);
      })
      .finally(() => setFetching(false));
  }
  function getUsers() {
    setUserFetching(true);
    Lead.getPaginated(0, 1000)
      .then(({ data: { data } }) => {
        setCustomers(data);
      })
      .finally(() => setUserFetching(false));
  }
  const processOrder = (formVals, user) => {
    setLoading(true);
    // vals.endDate = new Date(vals.endDate);
    // vals.startDate = new Date(vals.startDate);
    const data = {
      ...objectOnly(formVals, ["phone", "email", "address2", "country", "city"]),
      customerType: APP_USER.customer,
      name: user?.name,
      address1: user?.address,
      courseID: "",
      orderID: "Order-" + RandomString(10),
      startDate: DateTime().now(),
      endDate: "",
      subscriptionTier: "Manual Cash Payment",
      total: totalTier,
      userId: user?._id,
      courses: [OrderedCourse],
      // customerType: 1,
      // total: courseTotalPrice(),
      // courses: totalCoursePackage(cartsData),
    };

    OrderService.add(data)
      .then((result) => {
        history.push("/orders");
      })
      .catch((err) => {
        if (err?.response?.status == 400) setRes(err?.response?.data?.message);
        else toast.error("Oops! Error creating customer's order after account has been created... Error: " + err?.response?.statusText);
      })
      .finally(() => setLoading(false));
  };

  function getSingleCourses(val) {
    let vv = null;
    courses.forEach((v, idx) => {
      if (v._id == val) {
        return (vv = v);
      }
    });
    return vv;
  }

  function handleFindCourse(value) {
    if (!value) {
      getCourses(false);
    }
    onFindCourses({
      value,
      onLoadStart: (data) => {
        setCourses(data);
      },
      onResultsData: (data) => {
        setCourses(data);
      },
    });
  }
  useEffect(() => {
    getCourses();
    getUsers();
  }, []);

  if (fetching || userFetching) {
    return <LoadingAnim />;
  }
  // console.log(OrderedCourse, RandomString(10));
  return (
    <>
      <nav class="mt-5 ps-5 navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid ">
          {/* <Link class="nav-link" to="/newOrder">
            New Customer Order<span style={{ marginLeft: "10px" }}>|</span>
          </Link> */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="customerNewOrder">
                  New Customer Order<span style={{ marginLeft: "10px" }}>|</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="customerNewOrder">
                  Existing Customer Order<span style={{ marginLeft: "10px" }}>|</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="newLeadOrder">
                  Lead
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Row>
        <Col sm={6}>
          <Form
            name="wrap"
            labelCol={{ flex: "130px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            onFinish={handleUserOrderAccount}
            layout="horizontal"
            initialValues={initialData}
            form={form}
            // initialValues={data}
            // onValuesChange={_handleChange}
          >
            <div className="pt-4" />
            <Form.Item label="Select Lead" name="customer" rules={[{ required: true }]}>
              <Select showSearch defaultValue={"Select a Lead User"} onChange={selectUserOrderAccount}>
                {customers.map(({ _id, name, email }) => (
                  <Select.Option key={_id} value={_id}>
                    {name || split(email, "@", 0)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            {/* <CountryList isRequired={false} />
            <Form.Item label="Address" name="address" rules={[{ required: false }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address 2" name="address2" rules={[{ required: false }]}>
              <Input />
            </Form.Item> */}
            <br />
            <Form.Item label="Courses" name="course" rules={[{ required: true }]}>
              <Select
                showSearch
                onSearch={handleFindCourse}
                filterOption={false}
                notFoundContent={null}
                //
                defaultValue={"Select a course"}
                onChange={(v) => {
                  const { avl_packages, _id, ...otherProps } = getSingleCourses(v),
                    jsonp = EmjsF(avl_packages).parse();
                  setSubscriptionTier([freePackage].concat(jsonp));

                  setOrderedCourse({ courseId: _id, course: otherProps });
                }}
              >
                {courses.map(({ _id, name, avl_packages }) => (
                  <Select.Option key={_id} data-value={avl_packages} value={_id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Subscription Tier" name="subscriptionTier" rules={[{ required: true }]}>
              <Select
                onChange={(v) => {
                  const course_package = jsonValue(v).parse(),
                    {
                      price: { usd = 0, jod = 0 },
                    } = course_package;

                  setTotalTier(jod);
                  setOrderedCourse((s) => ({ ...s, coursePackage: course_package }));
                }}
                defaultValue={"Select a Packages"}
              >
                {SubscriptionTier.map((item, idx) => (
                  <Select.Option key={idx} value={jsonValue(item).toStringAll()}>
                    {toCapitalize(String(item?.label || item?.duration).replaceAll("_", " "))}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <div className="row my-4 ms-1">
                <p className=" col-sm-2 col-md-3 text-sm-end">Total</p>
                <p className=" col-sm-3 py-1 pricep">JOD {totalTier}.00</p>
              </div>
            </Form.Item>
            {Res && <div className="alert alert-danger">{Res}</div>}
            <Form.Item>
              <Button className="col-2 offset-sm-3" id="mybtnupdate" htmlType="submit" loading={userRes || loading}>
                Add
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {/* 
     
     
      <div className="row mb-2">
        <p className="col-sm-2 col-md-3 text-sm-end">Subscription Tier</p>
        <div className="col-sm-7">
          <select className="form-control form-select myinput">
            <option value="" selected>
              Complementry
            </option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
        </div>
      </div>
      <div className="row my-4 ms-1">
        <p className=" col-sm-2 col-md-3 text-sm-end">Total</p>
        <p className=" col-sm-3 py-1 pricep">$0.00</p>
      </div>
      <div className="row mb-2 ms-2">
        <button className="col-2 offset-sm-3" id="mybtnupdate">
          Add
        </button>
      </div>
    </div> */}
    </>
  );
};

export default NewLeadOrder;
