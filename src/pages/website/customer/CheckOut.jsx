import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl, CountryData, DateTime, EmjsF, objectOnly, object_entries, Post, toCapitalize } from "../../../applocal";
import LoadingAnim from "../../../components/LoadingAnim";
import { setCustomer } from "../../../redux/actions/auth";
import { CourseLists } from "../CreateUserOrder";
// import Body from "../Body";
import PaymentAPI from "../../../services/PaymentAPI";
import { clearCartItem, setPayment } from "../../../redux/actions";
import orderService from "../../../services/orders";
import cardDateFormat from "../component/CardDateFormat";
//         {
//     "status": "success",
//     "message": "payment successfully",
//     "orderId": "order-uKnAgzh5cE",
//     "transactionId": "trans-x0V81uJ1Ig"
// }
export function totalPrice(cartsData_ = []) {
  const tt = (key = "jod") =>
    cartsData_
      .map((itm) => {
        const { course_pkg, course } = itm["1"];
        const { price } = EmjsF(course_pkg).parse();
        return price[key];
      })
      .reduce((l, r) => Number(l) + Number(r), 0);
  return tt;
}
export function totalCoursePackage(cartsData_ = []) {
  const tt = cartsData_.map((itm) => {
    const {
      course_pkg,
      course: { _id, ...courseData },
    } = itm["1"];
    const pk = EmjsF(course_pkg).parse();

    return {
      courseId: _id,
      course: courseData,
      coursePackage: pk,
    };
  });
  return tt;
}

export default function CheckOut() {
  const initialValues = {
    card_name: "",
    card_number: "",
    card_date: "",
    card_cvc: "",
    card_country: "JO",
    card_postcode: "",
  };

  const dsPact = useDispatch();
  const { carts, payment } = useSelector((s) => s.globals);
  const { user, userRl } = useSelector((s) => s.auth);
  const cartsData = object_entries(carts);
  const len = cartsData.length > 0;

  const [OrderProcessing, setOrderProcessing] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [paymentReqDone, setpaymentReqDone] = useState(false);

  const dispatch = useDispatch();
  const courseTotalPrice = totalPrice(cartsData);
  function processOrder({ card, orderId: orderID }) {
    setOrderProcessing(true);
    // setAccountName(data_.fname + " " + data_.lname);
    const data = {
      ...objectOnly(user, ["phone", "email", "address", "country", "city"]),
      customerType: userRl,
      name: user?.name || card?.card_name,
      address1: user?.address,
      address2: "",
      courseID: "",
      orderID,
      startDate: DateTime().now(),
      endDate: "",
      subscriptionTier: "Credit Card",
      total: courseTotalPrice(),
      userId: user?.id,
      courses: totalCoursePackage(cartsData),
    };

    orderService
      .add(data)
      .then(({ data }) => {
        dispatch(clearCartItem());
        window.location.href = baseUrl("#/myCourses");
      })
      .finally(() => {
        setOrderProcessing(false);
      });
  }

  if (!len) {
    return <Redirect to={"myCourses"} />;
  }
  const [form] = Form.useForm();

  const addPayment = (v) => {
    setpaymentReqDone(true);
    const dt = {
      orderAmount: courseTotalPrice(),
      orderCurrency: "jod",
      "card-number": v.card_number,
      "expiry-month": v.card_date,
      "expiry-year": v.card_date,
      "security-code": v.card_cvc,
    };

    PaymentAPI.makePayment(dt)
      .then(({ data }) => {
        processOrder({ card: v, orderId: data?.orderId });
        dispatch(setPayment(data));
      })
      .finally(() => {
        setpaymentReqDone(false);
      });
  };
  function onExDate(e) {
    cardDateFormat(form)(e);
  }
  const showIndicator = paymentReqDone || OrderProcessing;

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-7">
          <div className="resize-450 m-0 mt-3 p-relative">
            <h3 className="fw-bold p-3  fz-3">Payment Information</h3>
            <Form
              initialValues={initialValues}
              onFinish={addPayment}
              form={form}
              // onValuesChange={addPayment}
              className="w-100 p-3 pr-5 p-relative"
              labelCol={{ flex: "130px" }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              // colon={false}
              layout="horizontal"
              // /* onValuesChange={_handleChange}*
            >
              {showIndicator && (
                <div className="row align-items-center text-center pointer-event p-absolute p-top-0 p-bottom-0 p-left-0 p-right-0" style={{ zIndex: 10, backgroundColor: "rgba(250,250,250,0.5)" }}>
                  <div className="col-12">
                    <LoadingAnim
                      children={
                        <p className="text-info fz-1-5 p-3" style={{ backgroundColor: "#fcfcfc" }}>
                          Processing order payment...
                        </p>
                      }
                    />
                  </div>
                </div>
              )}
              <p className="fz-sm..fw-bold p-0 m-0">Card Holder Name</p>
              <Form.Item label="" name="card_name" rules={[{ required: true }]}>
                <Input type="text" placeholder="Mohammad Terry" className="w-100 .rad_10" />
              </Form.Item>
              <label htmlFor="fz-sm fw-bold">Card Number</label>
              <Form.Item name="card_number" rules={[{ required: true, min: 6 }]}>
                <div className="p-relative">
                  <Input type="number" style={{ paddingRight: 108 }} placeholder="1234 1234 1234 1234" className="w-100 .rad_10" />
                  <div className="p-absolute  pr-2 pt-1 p-top-0 p-right-0">
                    <svg width="108" height="17" viewBox="0 0 108 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.75 0.75H2.25C1.14543 0.75 0.25 1.64543 0.25 2.75V14.25C0.25 15.3546 1.14543 16.25 2.25 16.25H21.75C22.8546 16.25 23.75 15.3546 23.75 14.25V2.75C23.75 1.64543 22.8546 0.75 21.75 0.75Z" fill="white" stroke="black" stroke-opacity="0.2" stroke-width="0.5" />
                      <path
                        d="M2.78773 6.41444C2.26459 6.12751 1.66754 5.89674 1 5.73659L1.028 5.61188H3.76498C4.13596 5.62489 4.43699 5.73651 4.53495 6.13071L5.12977 8.96659L5.31198 9.82073L6.97797 5.61188H8.77679L6.10288 11.7775H4.30397L2.78773 6.41444ZM10.1 11.7841H8.39883L9.46285 5.61188H11.1639L10.1 11.7841ZM16.2668 5.76277L16.0354 7.09559L15.8816 7.03004C15.5737 6.90525 15.1674 6.78054 14.6144 6.79371C13.9427 6.79371 13.6415 7.06277 13.6345 7.32546C13.6345 7.61441 13.9989 7.80484 14.5939 8.08725C15.574 8.52719 16.0286 9.06557 16.0218 9.76819C16.0081 11.0486 14.846 11.8761 13.0611 11.8761C12.2979 11.8694 11.5628 11.7181 11.1638 11.5476L11.4019 10.162L11.6259 10.2607C12.1789 10.4907 12.5428 10.589 13.222 10.589C13.7118 10.589 14.2369 10.3984 14.2436 9.98488C14.2436 9.71565 14.0199 9.51851 13.3617 9.21646C12.7178 8.92087 11.8568 8.42848 11.8708 7.54198C11.8781 6.34042 13.0611 5.5 14.741 5.5C15.399 5.5 15.9312 5.63789 16.2668 5.76277ZM18.5278 9.59749H19.9417C19.8718 9.28889 19.5496 7.81147 19.5496 7.81147L19.4307 7.27964C19.3467 7.50943 19.1999 7.88373 19.2069 7.87056C19.2069 7.87056 18.6678 9.2429 18.5278 9.59749ZM20.6276 5.61188L22 11.784H20.4249C20.4249 11.784 20.2708 11.0748 20.2219 10.8581H18.0378C17.9746 11.0222 17.6808 11.784 17.6808 11.784H15.8958L18.4226 6.12399C18.5977 5.72342 18.906 5.61188 19.3118 5.61188H20.6276Z"
                        fill="#171E6C"
                      />
                      <path d="M50 0.5H30C28.8954 0.5 28 1.39543 28 2.5V14.5C28 15.6046 28.8954 16.5 30 16.5H50C51.1046 16.5 52 15.6046 52 14.5V2.5C52 1.39543 51.1046 0.5 50 0.5Z" fill="#252525" />
                      <path d="M37 13.5C39.7614 13.5 42 11.2614 42 8.5C42 5.73858 39.7614 3.5 37 3.5C34.2386 3.5 32 5.73858 32 8.5C32 11.2614 34.2386 13.5 37 13.5Z" fill="#EB001B" />
                      <path d="M43 13.5C45.7614 13.5 48 11.2614 48 8.5C48 5.73858 45.7614 3.5 43 3.5C40.2386 3.5 38 5.73858 38 8.5C38 11.2614 40.2386 13.5 43 13.5Z" fill="#F79E1B" />
                      <path d="M78 0.5H58C56.8954 0.5 56 1.39543 56 2.5V14.5C56 15.6046 56.8954 16.5 58 16.5H78C79.1046 16.5 80 15.6046 80 14.5V2.5C80 1.39543 79.1046 0.5 78 0.5Z" fill="#016FD0" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M74.1954 13.2689L76.2827 11.0419L74.1953 8.82007H75.811L77.0865 10.2301L78.3656 8.82007H79.9117V8.85507L77.8689 11.0419L79.9117 13.2057V13.2689H78.35L77.0519 11.8447L75.7671 13.2689H74.1954Z" fill="#016FD0" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M70.2374 3.13184H72.6834L73.5426 5.08269V3.13184H76.5624L77.0832 4.59341L77.6057 3.13184H79.9116V8.83323H67.7251L70.2374 3.13184Z" fill="#FFFFFE" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M70.7006 3.75146L68.7266 8.19664H70.0805L70.4529 7.30647H72.4708L72.843 8.19664H74.2306L72.2648 3.75146H70.7006ZM70.8702 6.3089L71.4622 4.89383L72.0538 6.3089H70.8702Z" fill="#016FD0" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M74.2119 8.19582V3.75073L76.115 3.75727L77.0943 6.49L78.0799 3.75073H79.9115V8.19582L78.7329 8.20625V5.1529L77.6204 8.19582H76.5446L75.4089 5.14247V8.19582H74.2119Z" fill="#016FD0" />
                      <path
                        d="M105.997 16.2499L105.999 16.2499C106.954 16.2581 107.738 15.4773 107.75 14.5042L107.75 2.5063C107.746 2.03569 107.559 1.58617 107.23 1.2568C106.901 0.928269 106.459 0.746149 105.997 0.750071L86.0006 0.750062C85.5411 0.746149 85.0986 0.928269 84.7703 1.2568C84.4411 1.58617 84.2538 2.03569 84.25 2.50426L84.25 14.4937C84.2538 14.9643 84.4411 15.4138 84.7703 15.7432C85.0986 16.0717 85.5411 16.2538 86.0028 16.2499H105.997ZM105.996 16.7499C105.996 16.7499 105.995 16.7499 105.995 16.7499L105.997 16.7499H105.996Z"
                        fill="white"
                        stroke="black"
                        stroke-opacity="0.2"
                        stroke-width="0.5"
                      />
                      <path
                        d="M107.172 9.79643H106.32L105.36 8.53023H105.269V9.79643H104.574V6.65161H105.6C106.403 6.65161 106.866 6.98264 106.866 7.5785C106.866 8.06678 106.577 8.38126 106.055 8.48057L107.172 9.79643ZM106.146 7.60333C106.146 7.29712 105.915 7.13988 105.484 7.13988H105.269V8.09161H105.468C105.915 8.09161 106.146 7.92609 106.146 7.60333ZM102.141 6.65161H104.11V7.18126H102.836V7.88471H104.061V8.42264H102.836V9.27505H104.11V9.80471H102.141V6.65161ZM99.9063 9.87919L98.4001 6.64333H99.1614L100.113 8.76195L101.073 6.64333H101.818L100.295 9.87919H99.9228H99.9063ZM93.6083 9.87092C92.549 9.87092 91.7214 9.15092 91.7214 8.21574C91.7214 7.3054 92.5656 6.56885 93.6249 6.56885C93.9228 6.56885 94.1711 6.62678 94.4773 6.75919V7.48747C94.2454 7.25965 93.9334 7.13187 93.6083 7.13161C92.9463 7.13161 92.4414 7.61161 92.4414 8.21574C92.4414 8.85299 92.938 9.30816 93.6414 9.30816C93.9559 9.30816 94.1959 9.20885 94.4773 8.96057V9.68885C94.1628 9.82126 93.898 9.87092 93.6083 9.87092ZM91.5063 8.83643C91.5063 9.44885 91.0014 9.87092 90.2732 9.87092C89.7435 9.87092 89.3628 9.68885 89.0401 9.27505L89.4952 8.88609C89.6525 9.16747 89.9173 9.30816 90.2483 9.30816C90.5628 9.30816 90.7863 9.11781 90.7863 8.86954C90.7863 8.72885 90.7201 8.62126 90.5794 8.5385C90.4251 8.46365 90.2645 8.40271 90.0994 8.35643C89.4456 8.14954 89.2221 7.92609 89.2221 7.48747C89.2221 6.97436 89.7021 6.5854 90.3311 6.5854C90.7283 6.5854 91.0842 6.70954 91.3821 6.94126L91.018 7.35505C90.8737 7.19683 90.6694 7.10671 90.4552 7.10678C90.1573 7.10678 89.9421 7.25574 89.9421 7.45436C89.9421 7.61988 90.0663 7.71092 90.4801 7.85161C91.2745 8.09988 91.5063 8.33161 91.5063 8.84471V8.83643ZM88.0883 6.65161H88.7835V9.80471H88.0883V6.65161ZM85.8538 9.80471H84.8276V6.65161H85.8538C86.9794 6.65161 87.7573 7.29712 87.7573 8.22402C87.7573 8.69574 87.5256 9.14264 87.1201 9.44057C86.7725 9.68885 86.3835 9.80471 85.8456 9.80471H85.8538ZM86.6649 7.43781C86.4332 7.25574 86.1683 7.18954 85.7132 7.18954H85.5228V9.27505H85.7132C86.1601 9.27505 86.4414 9.1923 86.6649 9.02678C86.9049 8.82816 87.0456 8.53023 87.0456 8.22402C87.0456 7.91781 86.9049 7.62816 86.6649 7.43781Z"
                        fill="black"
                      />
                      <path d="M96.414 6.56885C95.5036 6.56885 94.7588 7.29712 94.7588 8.19919C94.7588 9.15919 95.4705 9.87919 96.414 9.87919C97.3409 9.87919 98.0691 9.15092 98.0691 8.22402C98.0691 7.29712 97.3491 6.56885 96.414 6.56885Z" fill="#F27712" />
                    </svg>
                  </div>
                </div>
              </Form.Item>
              <div className="row">
                <div className="col-6 p-0 pr-2">
                  <label className="fz-sm fw-bold">Expiry</label>
                  <Form.Item name="card_date" onKeyDown={onExDate} onChange={onExDate} rules={[{ required: true, type: "string", min: 5 }]}>
                    <Input type="text" pattern="[0-9]{2}/[0-9]{2}" placeholder="MM / YY" className="w-100 .rad_10" />
                  </Form.Item>
                </div>
                <div className="col-6 p-0 pl-2">
                  <label className="fz-sm fw-bold">CVC</label>
                  <Form.Item name="card_cvc" rules={[{ required: true, type: "string", min: 2 }]}>
                    <Input type="text" placeholder="CVC" className="w-100 .rad_10" />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-6 p-0 pr-2">
                  <label className="fz-sm fw-bold">Country</label>
                  <Form.Item name="card_country" rules={[{ required: true }]}>
                    <Select
                      //
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => {
                        const childrenValue = String(option?.props?.children).toLowerCase().trim();
                        return childrenValue.startsWith(input);
                      }}
                      className=""
                      placeholder="Select"
                    >
                      {CountryData.map((item, i) => (
                        <Select.Option key={i} value={item.code}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-6 p-0 pl-2">
                  <label className="fz-sm fw-bold">Postal</label>
                  <Form.Item name="card_postcode" rules={[{ required: true }]}>
                    <Input type="text" placeholder="11953" className="w-100 .rad_10" />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-0">
                  <button type="submit" className="btn w-100 btn-success text-uppercase">
                    Buy Now
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-5">
          <div className="outline-shadow bg-white mt-5">
            <h3 className="fw-bold p-3  fz-3">Payment Information</h3>

            {cartsData.map((itm) => {
              const { course_pkg, course } = itm["1"];
              const {
                duration,
                price: { usd = "", jod = "" },
              } = EmjsF(course_pkg).parse();
              return <CourseLists title={course.name} date={duration.replace("_", " ")} amount={`$${usd} - ${jod} JOD`} />;
            })}
            <CourseLists col1={6} col2={6} title={"Total"} date={""} amount={`$${courseTotalPrice("usd")} - ${courseTotalPrice()} JOD`} />
          </div>
        </div>
      </div>
    </div>
  );
}
