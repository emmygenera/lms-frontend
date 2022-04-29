import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import qs from "query-string";
import LoadingAnim from "../../../components/LoadingAnim";
import InvoiceAPI from "../../../services/InvoiceAPI";
import { toast } from "react-toastify";
import { DateTime, EmjsF, jsonValue } from "../../../applocal";
import orderService from "../../../services/orders";
import Courses from "../../../services/courses";
import InvoicePrint from "./InvoicePrint";
import { useRef } from "react";

const UpdateInvoice = ({ location, history }) => {
  const [initVals, setInitVals] = useState({
    orderId: "",
    clientName: "",
    invoiceDate: "",
    paymentDate: "",
    paymentMethod: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    email: "",
    recieptID: "",
    userId: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [LoadOrderDetails, setLoadOrderDetails] = useState(true);
  const [OrderDetailsLoading, setOrderDetailsLoading] = useState(false);
  const [PurchasedCourses, setPurchasedCourses] = useState([]);
  const [is_init, setis_init] = useState(false);
  const [OrderLists, setOrderLists] = useState([]);
  const [form] = Form.useForm();
  const frameRef = useRef();

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });

  async function getInvoice() {
    const {
      data: { data: tipsData },
    } = await InvoiceAPI.getSingle(paramData).catch(() => toast.error("unable to get Leads data"));
    // if (EmjsF(tipsData?.users).isArray()) tipsData.users = tipsData.users.map((v) => v.userId);
    setInitVals(tipsData);
    //console.log(tipsData);
    form.setFieldsValue(tipsData);
    setis_init(true);
  }

  async function getPaidOrders() {
    setLoadOrderDetails(true);
    const {
      data: { data },
    } = await InvoiceAPI.reciepts().catch(() => toast.error("unable to get Paid Orders List"));
    // if (EmjsF(tipsData?.users).isArray()) tipsData.users = tipsData.users.map((v) => v.userId);
    setOrderLists(data);
    setis_init(true);
    setLoadOrderDetails(false);
  }

  const addNew = (vals) => {
    // vals.users = vals.users.map((v) => ({ userId: v }));
    const sc = {
      invoiceId: initVals.orderId,
      orderId: vals.orderId,
      name: vals.clientName,
      invoicedate: vals.invoiceDate,
      paymentedate: vals.paymenteDate,
      userId: initVals.userId,
      total: totalPrices(),
      courses: PurchasedCourses,
    };
    // editorState;
    setLoading(true);
    const sd = paramData ? "update" : "add";
    InvoiceAPI[sd]({ data: sc, id: paramData })
      .then((result) => {
        history.push("/invoices");
        // console.log(result)
      })
      .finally(() => setLoading(false));
  };
  const coursesPk = [
    {
      courseId: "621def9386800800162cb6cd",
      coursePackage: {
        duration: "one_month",
        price: {
          usd: "15",
          jod: "150",
        },
      },
    },
    {
      courseId: "621e109721c39e0016e8136f",
      coursePackage: {
        duration: "one_month",
        price: {
          usd: "15",
          jod: "150",
        },
      },
    },
    {
      courseId: "621e0ef921c39e0016e81369",
      coursePackage: {
        duration: "one_month",
        price: {
          usd: "10",
          jod: "100",
        },
      },
    },
  ];

  function getCourses(coursesPk_ = coursesPk) {
    // setLoadOrderDetails(true);
    setOrderDetailsLoading(true);
    Promise.all(coursesPk_?.map(({ courseId }) => Courses.getSingle(courseId)))
      .then((data) => {
        const cs = coursesPk_?.map(({ courseId, ...other }) => ({ ...other, courseId, courseName: data.map(({ data: { data } }) => data).filter(({ _id }) => _id == courseId)[0]?.name }));

        setPurchasedCourses(cs);
      })
      .finally(() => {
        setOrderDetailsLoading(false);
      });
  }
  const onValuesChange = (v) => {
    setInitVals((s) => ({ ...s, ...v }));
  };

  function poplateInvoices(v) {
    //console.log("test", OrderLists.filter((itm) => itm._id == v)[0]);
    const { _id = "", name = "", createdAt, recieptID, userId, address1, address2, city, country, email, phone, courses = [] } = OrderLists.filter((itm) => itm?._id == v).reduce((l, r) => r, {});
    const dt = DateTime(createdAt).dateISO();

    getCourses(courses || []);
    // EmjsF(DateTime(createdAt)).objList(({ value: v, key: k }) => console.log(k, v()));
    const val = { ...initVals, recieptID, userId, address1, address2, city, country, paymentDate: dt, invoiceDate: dt, orderId: _id, paymentMethod: "card", clientName: name };
    setInitVals(val);
    form.setFieldsValue(val);
  }

  //    const onReset = () => {
  //      form.resetFields();
  //    };

  //    const onFill = () => {
  //      form.setFieldsValue({
  //        note: "Hello world!",
  //        gender: "male",
  //      });
  //    };

  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } else getInvoice();
    getPaidOrders();
  }, []);

  React.useEffect(() => {
    if (paramData && initVals.orderId && OrderLists.length > 0) {
      poplateInvoices(initVals.orderId);
    }
  }, [jsonValue(OrderLists).toStringAll(), jsonValue(initVals).toStringAll()]);

  if (!is_init) {
    return <LoadingAnim />;
  }
  function totalPrices(data = PurchasedCourses) {
    const amt = data
      .map(({ coursePackage: { price } }) => price.jod)
      .reduce((cpL, cpR) => {
        // console.log({ cpL, cpR });
        // array reduce works in a reverse order... that is. it takes the recently some value and put it back to the left axis
        return Number(cpL) + Number(cpR);
      }, "0.00");
    return amt;
  }
  function printFrame(id = "printf") {
    if (!initVals.orderId || !initVals.clientName) return toast.error("Oops!... Form fields needs to be filled to generate invoice.");

    // window.frames[id].focus();
    // window.frames[id].print();
    // console.log(window.frames);
    // window.print();
    // for (var k = 0; k < window.frames.length; k++) {
    window.frames[0].focus();
    window.frames[0].print();
    // }
    // var frm = frameRef.current.contentWindow;
    // // var frm = document.getElementById(id).contentWindow;
    // frm.focus(); // focus on contentWindow is needed on some ie versions
    // frm.print();
    return false;
  }
  return (
    <>
      <Form
        name="wrap"
        onValuesChange={onValuesChange}
        className="resize-450."
        labelCol={{ flex: "130px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        layout="horizontal"
        onFinish={addNew}
        //
        initialValues={initVals}
        form={form}
      >
        <div className="shadow-sm p-3 row mt-md-5">
          <div className=" col-md-6">
            <h5 className="offset-sm-3 mb-3 mt-5">
              <b>Payment Information</b>
            </h5>

            <Form.Item label="Order ID" name="orderId" rules={[{ required: true }]}>
              <Select onChange={poplateInvoices} className={"myinput"} placeholder={"Please select a Order ID"}>
                {OrderLists.map(({ _id, recieptID, name, email, orderID }, index) => (
                  <Select.Option key={index} value={_id}>
                    {(name || String(email).split("@").slice(1)) + " #" + orderID}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Client Name" className="text-right" name="clientName" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Invoice Date" name="invoiceDate" rules={[{ required: true }]}>
              <Input className="myinput" type="date" />
            </Form.Item>
            <Form.Item label="Payment Date" name="paymentDate" rules={[{ required: false }]}>
              <Input className="myinput" type="date" />
            </Form.Item>
            <Form.Item label="Payment Method" name="paymentMethod" rules={[{ required: true }]}>
              <Select className={"myinput"} placeholder={"Please select"}>
                {[
                  { name: "card", value: "Credit Card" },
                  { name: "manual", value: "Manual Cash Payment" },
                  { name: "bank", value: "bank deposit" },
                ].map(({ value, name }, index) => (
                  <Select.Option key={index} value={name}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button className="mt-2 col-4 offset-sm-4 btnupdate" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {paramData ? "Update" : "Add"} Invoice
              </Button>
            </Form.Item>
          </div>
          <div className="col-md-6 ">
            <h5 className="offset-sm-2 mb-3  mt-md-0">
              <b>Courses</b>
            </h5>
            {LoadOrderDetails || OrderDetailsLoading ? (
              <LoadingAnim />
            ) : (
              <>
                {PurchasedCourses?.map((item, idx) => (
                  <div key={idx} className="row mb-2">
                    <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
                      {item?.courseName}
                    </p>
                    <div className="col-sm-3 align-items-center">
                      <p className="col-sm-8  form-control  myinput" style={{ fontSize: "0.9em" }}>
                        {String(item?.coursePackage?.duration).replace("_", " ")}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="row mb-2 mt-1">
                  <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
                    Amount Recieved
                  </p>
                  <div className="col-sm-3 align-items-center">
                    <p className="col-sm-8  form-control  myinput" style={{ fontSize: "0.9em" }}>
                      {totalPrices()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 offset-sm-2">
                  <h5>
                    <b>Invoice Balance {totalPrices()} JOD</b>
                  </h5>
                </div>
              </>
            )}
            <div className="row">
              <div className="col-10 offset-sm-2">
                <div className="d-flex">
                  <button type="button" onClick={printFrame} style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", fontSize: "0.9em" }}>
                    VIEW
                  </button>
                  <button type="button" onClick={printFrame} style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", marginLeft: "15px", fontSize: "0.9em" }}>
                    PRINT
                  </button>
                  {/* <button style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", marginLeft: "15px", fontSize: "0.9em" }}>DELETE</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <InvoicePrint
          ref={frameRef}
          data={{
            values: initVals,
            total: totalPrices(),
            Courses: PurchasedCourses,
          }}
        />
      </Form>
    </>
  );
};

export default UpdateInvoice;
