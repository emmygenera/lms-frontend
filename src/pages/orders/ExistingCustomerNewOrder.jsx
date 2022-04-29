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
import onFindCourses from "./components/onFindCourses";

const ExistingCustomerNewOrder = ({ history }) => {
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
  const [searchUser, setsearchUser] = useState("");
  const [userResDone, setuserResDone] = useState(false);
  const [Res, setRes] = useState("");

  const freePackage = {
    duration: "one_month_free",
    // label: "30 days free",
    price: { usd: "0", jod: "0" },
  };

  const dispatch = useDispatch();
  // const _handleChange = (value) => setData(data => ({ ...data, value }));
  function handleUserOrderAccount(data_) {
    setuserRes(true);
    // setAccountName(data_.fname + " " + data_.lname);
    const selectedUser = customers.filter((itm) => itm?._id == data_?.customer).reduce((l, r) => r, {});

    // const data = objectRemove(
    //   {
    //     ...data_,
    //   },
    //   ["course", "subscriptionTier"]
    // );
    // setRes("");
    // Post({ url: "users/add", data, dataType: "json" })
    //   .then(({ data: { data: _data } }) => {
    processOrder(data_, selectedUser);
    //   })
    //   .catch((err) => {
    //     if (err?.response?.status == 400) setRes(err?.response?.data?.message);
    //     else toast.error("Oops! Error occured while creating user account... Error: " + err?.response?.statusText);
    //   })
    //   .finally(() => {
    //     setuserRes(false);
    //   });
  }

  function getCourses(loading = true) {
    setFetching(loading);
    Courses.getAll()
      .then(({ data: { data } }) => {
        setCourses(data);
      })
      .finally(() => setFetching(false));
  }
  async function gusers(v) {
    const {
      data: { data: data_1 },
    } = await Customer.getPaginated(0, 50, v);
    setCustomers(data_1);
  }
  function getUsers() {
    setUserFetching(true);
    gusers().finally(() => setUserFetching(false));
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

  let timeout;

  function onfinduser(value) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      setCustomers([{ name: "Getting Data...", _id: "" }]);
      gusers(value);
    }, 300);
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

  return (
    <>
      <nav class="mt-5 ps-5 navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          {/* <Link class="nav-link" to="/newOrder">
            New Customer Order<span style={{ marginLeft: "10px" }}>|</span>
          </Link> */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/newOrder">
                  New Customer Order<span style={{ marginLeft: "10px" }}>|</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="customerNewOrder">
                  Existing Customer Order<span style={{ marginLeft: "10px" }}>|</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="newLeadOrder">
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
            // initialValues={data}
            // onValuesChange={_handleChange}
          >
            <div className="pt-4" />
            <Form.Item label="Existing Customers" name="customer" rules={[{ required: true }]}>
              <Select
                //
                showSearch
                onSearch={onfinduser}
                defaultValue={"Select a user"}
                defaultActiveFirstOption={false}
                // showArrow={false}
                filterOption={false}
                notFoundContent={null}
              >
                {customers.map(({ _id, name, email }) => (
                  <Select.Option key={_id} value={_id}>
                    {name || split(email, "@", 0)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Courses" name="course" rules={[{ required: true }]}>
              <Select
                showSearch
                onSearch={handleFindCourse}
                filterOption={false}
                notFoundContent={null}
                defaultValue={"Select a course"}
                onChange={(v) => {
                  const { avl_packages, _id, ...otherProps } = getSingleCourses(v),
                    jsonp = EmjsF(avl_packages).parse();
                  setSubscriptionTier([freePackage].concat(jsonp));

                  setOrderedCourse({ courseId: _id, course: otherProps });
                }}

                // filterOption={(input, option) => {
                // const childrenValue = String(option?.props?.children).toLowerCase().trim();
                // const value = String(option?.props?.value).toLowerCase().trim();
                // return childrenValue.startsWith(input);

                // }}
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

export default ExistingCustomerNewOrder;
