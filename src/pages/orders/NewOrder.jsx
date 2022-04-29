import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./orders.scss";
import { Row, Col } from "react-bootstrap";
import { Form, Input, Select, DatePicker, Button } from "antd";
import CountryList from "../../components/CountriesDropdown";
import { useDispatch, useSelector } from "react-redux";
import OrderService from "../../services/orders";
import { DateTime, EmjsF, jsonValue, objectOnly, objectRemove, Post, RandomString, toCapitalize } from "../../applocal";
import LoadingAnim from "../../components/LoadingAnim";
import Courses from "../../services/courses";
import { setCustomer } from "../../redux/actions/auth";
import { totalCoursePackage } from "../website/customer/CheckOut";
import APP_USER from "../../services/APP_USER";
import { toast } from "react-toastify";
import onFindCourses from "./components/onFindCourses";

const NewOrder = ({ history }) => {
  // const [data, setData] = useState({});
  // const { courses } = useSelector((state) => state.general);
  const [courses, setCourses] = useState([]);
  const [OrderedCourse, setOrderedCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [totalTier, setTotalTier] = useState(0);
  const [subTier, setSubTier] = useState(0);
  const [SubscriptionTier, setSubscriptionTier] = useState([]);
  const [userRes, setuserRes] = useState(false);
  const [accountName, setAccountName] = useState("");
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
    const data = objectRemove(
      {
        ...data_,
      },
      ["course", "subscriptionTier"]
    );
    setRes("");
    Post({ url: "users/add", data, dataType: "json" })
      .then(({ data: { data: _data } }) => {
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
  }, []);

  if (fetching) {
    return <LoadingAnim />;
  }
  // console.log(OrderedCourse, RandomString(10));
  return (
    <>
      <nav class="mt-5 ps-5 navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/newOrder">
            New Customer Order<span style={{ marginLeft: "10px" }}>|</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="customerNewOrder">
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
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address 2" name="address2" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Course" name="course" rules={[{ required: true }]}>
              <Select
                showSearch
                onSearch={handleFindCourse}
                defaultActiveFirstOption={false}
                // showArrow={false}
                filterOption={false}
                notFoundContent={null}
                defaultValue={"Select a course"}
                onChange={(v) => {
                  const { avl_packages, _id, ...otherProps } = getSingleCourses(v),
                    jsonp = EmjsF(avl_packages).parse();
                  setSubscriptionTier([freePackage].concat(jsonp));

                  setOrderedCourse({ courseId: _id, course: otherProps });
                  // const { avl_packages } = getSingleCourses(v);
                  // let total = 0;
                  // // console.log(jsonp);
                  // EmjsF(jsonp).objList(({ key, value }) => {
                  //   total += Number(value["price"].usd);
                  // });
                  // setTotalTier(total);
                }}
              >
                {courses.map(({ _id, name, avl_packages }) => (
                  <Select.Option data-value={avl_packages} value={_id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/*             
            <Form.Item label="Start date" name="startDate" rules={[{ required: true }]}>
              <DatePicker size={"large"} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Expire date" name="endDate" rules={[{ required: true }]}>
              <DatePicker size={"large"} style={{ width: "100%" }} />
            </Form.Item> */}

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
                {/* //[
              //     { name: "complimentary", value: 0 },
              //     { name: "Standard", value: 1 },
              //     { name: "Professional", value: 2 },
              //     // { name: "All Access", value: 50 },
              //   ] */}
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

export default NewOrder;

/**
 * import React from "react";
import { Link } from "react-router-dom";
import "./neworder.scss";
import { Col, Row } from "react-bootstrap";
const NewOrder = () => {
  return (
    <>
      <ul id="mynavul">
        <li>
          <Link to="" className="mynavlink">
            New Customer
          </Link>
        </li>
        <li>
          <Link to="" className="mynavlink">
            Exisiting Customer
          </Link>
        </li>
        <li>
          <Link to="" className="mynavlink">
            Lead
          </Link>
        </li>
      </ul>
      <Row>
        <Col xs={10} className="offset-1">
          <Form
            name="wrap"
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            layout="horizontal"
          // initialValues={data}
          // onValuesChange={_handleChange}
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
            <Country />
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Private Note" name="privateNotes" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
          </Form>
          {/* <div>
            Name{""} <input type="text" className="mb-4 myinput" style={{ backgroundColor: "transparent", marginLeft: "12px" }} />
          </div>
          <div>
            Phone{""} <input type="text" className="mb-4 myinput" style={{ marginLeft: "10px" }} />
          </div>
          <div>
            Email{""} <input type="text" className="mb-4 myinput" style={{ marginLeft: "16px" }} />
          </div>
          <div>
            Country{""}
            <select className="mb-4 p-1 myinput" style={{ marginLeft: "5px" }}>
              <option className="text-muted" value="" selected>
                Please select a country
              </option>
              <option value="">india</option>
              <option value="">pakistan</option>
              <option value="">USA</option>
              <option value="">Uk</option>
            </select>
          </div>
          <div>
            City
            <select className="mb-4 py-1 myinput" style={{ marginLeft: "32px", paddingRight: "32px" }}>
              <option className="text-muted" value="" selected>
                Please select a city
              </option>
              <option value="">Delhi</option>
              <option value="">newYork</option>
              <option value="">London</option>
              <option value="">Lahore</option>
            </select>
          </div>
          <div>
            Address <input type="text" className="mb-4 myinput" style={{ marginLeft: "2px" }} />
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-8px" }}>Address 2</p> <input type="text" className="mb-4 myinput" />
          </div>
          <div>
            Courses
            <select className="mb-4  myinput" style={{ paddingRight: "95px", marginLeft: "10px" }}>
              <option value="" selected>
                Course 1
              </option>
              <option value="">Course 2</option>
              <option value="">Course 3</option>
              <option value="">Course 4</option>
              <option value="">Course 5</option>
            </select>
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-30px" }}>Starting Date</p>
            <input type="datetime-local" className="mb-4 myinput" style={{ marginLeft: "5px" }} />
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-20px" }}>Expire Date</p>
            <input type="datetime-local" className="mb-4 myinput" style={{ marginLeft: "5px" }} />
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-55px" }}>Subscription Tier</p>
            <select className="mb-4  myinput" style={{ paddingRight: "95px", marginLeft: "5px" }}>
              <option value="" selected>
                Complementary
              </option>
              <option value=""> 2</option>
              <option value=""> 3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div>
          <div>Total</div>
          <div id="pricediv">
            <p>$0.00</p>
          </div>
          <button id="myaddbtn" style={{ marginLeft: "60px" }}>
            Add New
          </button>
          </Col>
          </Row>
        </>
      );
    };
    
    export default NewOrder;
    
 */
