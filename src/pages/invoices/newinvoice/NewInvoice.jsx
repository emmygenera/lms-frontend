import React from "react";
import { Row, Col } from "react-bootstrap";
const UpdateInvoice = () => {
    const [invoice, setInvoice] = React.useState({
        orderId: "",
        clientName: "",
        invoiceDate: "",
        paymentDate: "",
        paymentMethod: "",
    });
    return (
        <>
            <div className="shadow-sm p-3 row mt-md-5">
                <div className="col-md-5">
                    <h5 className="offset-sm-3 mb-3">
                        <b>Payment Information</b>
                    </h5>
                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end">Order ID</p>
                        <div className="col-sm-7">
                            <select
                                className="col-sm-7 form-select form-control myinput"
                                value={invoice.orderId}
                                onChange={(e) => {
                                    setInvoice({ ...invoice, orderId: e.target.value });
                                }}
                            >
                                <option value="" selected></option>
                                <option value="">india</option>
                                <option value="">pak</option>
                                <option value="">uk</option>
                                <option value="">usa</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end">Client Name</p>

                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control  myinput"
                                value={invoice.clientName}
                                onChange={(e) => {
                                    setInvoice({ ...invoice, clientName: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end">Invoice Date</p>

                        <div className="col-sm-7">
                            <input
                                type="date"
                                className="form-control  myinput"
                                value={invoice.invoiceDate}
                                onChange={(e) => {
                                    setInvoice({ ...invoice, invoiceDate: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end">Payment Date</p>

                        <div className="col-sm-7">
                            <input
                                type="date"
                                className="form-control  myinput"
                                value={invoice.paymentDate}
                                onChange={(e) => {
                                    setInvoice({ ...invoice, paymentDate: e.target.value });
                                }}
                            />
                        </div>
                    </div>

                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end" style={{ fontSize: "0.9em" }}>
                            Payment Method
                        </p>
                        <div className="col-sm-7">
                            <select
                                className=" form-control form-select myinput"
                                value={invoice.paymentMethod}
                                onChange={(e) => {
                                    setInvoice({ ...invoice, paymentMethod: e.target.value });
                                }}
                            >
                                <option value="" selected></option>
                                <option value="">A</option>
                                <option value="">B</option>
                                <option value="">C</option>
                                <option value="">D</option>
                            </select>
                        </div>
                    </div>

                    <div className="row ms-2">
                        <button id="mybtnupdate" className="col-4 offset-sm-4 mt-4">
                            Recieve Payment
                        </button>
                    </div>
                </div>
                <div className="col-md-7 ">
                    <h5 className="offset-sm-2 mb-3  mt-md-0">
                        <b>Courses</b>
                    </h5>
                    <div className="row mb-2">
                        <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
                            Live Trading Course
                        </p>
                        <div className="col-sm-3 align-items-center">
                            <input className="col-sm-8  form-control  myinput" value="1 Month 2000 JOD" style={{ fontSize: "0.9em" }} />
                        </div>
                    </div>
                    <div className="row mb-2 mt-1">
                        <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
                            Monetary Rules Course
                        </p>
                        <div className="col-sm-3 align-items-center">
                            <input className="col-sm-8  form-control  myinput" value="1 Month 2000 JOD" style={{ fontSize: "0.9em" }} />
                        </div>
                    </div>
                    <div className="row mb-2 mt-1">
                        <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
                            Angular Course
                        </p>
                        <div className="col-sm-3 align-items-center">
                            <input className="col-sm-8  form-control  myinput" value="1 Month 2000 JOD" style={{ fontSize: "0.9em" }} />
                        </div>
                    </div>
                    <div className="row mb-2 mt-1">
                        <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
                            Discount
                        </p>
                        <div className="col-sm-3 align-items-center">
                            <input className="col-sm-8  form-control  myinput" value="600 JOD" style={{ fontSize: "0.9em" }} />
                        </div>
                    </div>
                    <div className="row mb-2 mt-1">
                        <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: "0.9em" }}>
                            Amount Recieved
                        </p>
                        <div className="col-sm-3 align-items-center">
                            <input className="col-sm-8  form-control  myinput" value="600 JOD" style={{ fontSize: "0.9em" }} />
                        </div>
                    </div>
                    <div className="mt-4 offset-sm-2">
                        <h5>
                            <b>Invoice Balance 5400 JOD</b>
                        </h5>
                    </div>
                    <div className="row">
                        <div className="col-10 offset-sm-2">
                            <div className="d-flex">
                                <button style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", fontSize: "0.9em" }}>VIEW</button>
                                <button style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", marginLeft: "15px", fontSize: "0.9em" }}>PRINT</button>
                                <button style={{ color: "white", backgroundColor: "rgb(161, 30, 30)", border: "none", paddingLeft: "15px", paddingRight: "15px", marginLeft: "15px", fontSize: "0.9em" }}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Row className="mt-md-5 p-4" style={{ backgroundColor: "#FFFFFF" }}>
                <Col md={4} className="offset-md-1" style={{ paddingTop: "40px" }}>
                    <h5>
                        <b>Payment Information</b>
                    </h5>
                    <div class="mb-3">
                        <label for="country" class="form-label">
                            Order ID
                        </label>
                        <select className="form-control form-select" id="country">
                            <option value="" selected>
                                01
                            </option>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">
                            Name
                        </label>
                        <input type="text" class="form-control" id="name" />
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">
                            Phone
                        </label>
                        <input type="text" class="form-control" id="phone" />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">
                            Email
                        </label>
                        <input type="text" class="form-control" id="email" />
                    </div>
                    <button class="btn mt-6" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                        Recieve Payment
                    </button>
                </Col>
                <Col md={5} className="mt-4 mt-md-0 offset-md-1" style={{ paddingTop: "30px" }}>
                    <Row>
                        <Col sm={1} className="offset-2">
                            <h5>
                                <b>Courses</b>
                            </h5>
                        </Col>
                    </Row>
                    <form>
                        <div class="row mb-4 g-3 align-items-center">
                            <div className="col-5 text-end">
                                <label for="course" class="col-form-label">
                                    Live Trading Course
                                </label>
                            </div>
                            <div className="col-5">
                                <input type="text" id="course" class="form-control" value="1 Month 2000 JOD" />
                            </div>
                        </div>
                        <div class="row mb-4 g-3 align-items-center">
                            <div className="col-5 text-end">
                                <label for="course" class="col-form-label">
                                    Monetary Rules Course
                                </label>
                            </div>
                            <div className="col-5">
                                <input type="text" id="course" class="form-control" value="1 Month 2000 JOD" />
                            </div>
                        </div>
                        <div class="row mb-4 g-3 align-items-center">
                            <div className="col-5 text-end">
                                <label for="course" class="col-form-label">
                                    Angular Course
                                </label>
                            </div>
                            <div className="col-5">
                                <input type="text" id="course" class="form-control" value="1 Month 2000 JOD" />
                            </div>
                        </div>
                        <div class="row mb-4 g-3 align-items-center">
                            <div className="col-5 text-end">
                                <label for="course" class="col-form-label">
                                    Discount
                                </label>
                            </div>
                            <div className="col-5">
                                <input type="text" id="course" class="form-control" value=" 600 JOD" />
                            </div>
                        </div>
                        <div class="row mb-4 g-3 align-items-center">
                            <div className="col-5 text-end">
                                <label for="course" class="col-form-label">
                                    Amount Recieved
                                </label>
                            </div>
                            <div className="col-5">
                                <input type="text" id="course" class="form-control" value="600 JOD" />
                            </div>
                        </div>

                        <button class="btn offset-md-3" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            EDIT
                        </button>

                        <button class="btn  ms-1" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            PRINT
                        </button>

                        <button class="btn  m-1" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            DELETE
                        </button>
                    </form>
                </Col>
            </Row> */}
        </>
    );
};

export default UpdateInvoice;
