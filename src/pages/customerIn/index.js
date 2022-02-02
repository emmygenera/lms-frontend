import React from "react";
import "./customer.scss";
import Navbar from "./navbar/Navbar";
import Payment from "./Payment";

const Customer = () => {
    return (
        <>
            <Navbar />
            <div className="" id="order">
                <div className="row justify-content-evenly">
                    <div className="col-md-7">
                        <h1>Customer information </h1>
                        <input type="text" className="form-control mb-2" placeholder="email" />
                        <input type="password" className="form-control mb-2" placeholder="password(6 digits at least , case sensitive)" />
                        <input type="password" className="form-control mb-2" placeholder="confirm password" />
                        <div className="row justify-content-start align-items-center mt-2">
                            <div className="col-md-2">
                                <select class="custom-select" id="inputGroupSelect01" style={{ paddingLeft: "30px" }}>
                                    <option selected>+923</option>
                                    <option value="1">+923</option>
                                    <option value="2">+923</option>
                                    <option value="3">+923</option>
                                </select>
                            </div>
                            <div class="col-md-10">
                                <input type="text" class="form-control" />
                            </div>
                            <div />
                            <div className="row justify-content-start align-items-center mt-2">
                                <div className="col-md-10">
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn" id="button">
                                        Get code{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="d-flex justify-content-end mt-3 text-primary">existing account</p>
                        <Payment />
                    </div>
                    <div className="col-md-3">
                        <h1>Order Information</h1>
                        <div className="course-info">
                            <h5>Live trading course </h5>
                            <p>3 month duration</p>
                        </div>
                        <div className="course-info">
                            <h5>Manetory Registrars</h5>
                            <p>1 month duration</p>
                        </div>
                        <div className="course-info">
                            <h5>Avaliable Addons</h5>
                            <div className="trading">
                                <div>
                                    <p style={{ backgroundColor: "#b6b4b4" }}>
                                        Live trading <i class="bi bi-x"></i>
                                    </p>
                                </div>
                                <div>
                                    <p style={{ backgroundColor: "#b6b4b4" }}>
                                        Trading summary 101 <i class="bi bi-x"></i>
                                    </p>
                                </div>
                            </div>
                            <h5>Total</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Customer;
