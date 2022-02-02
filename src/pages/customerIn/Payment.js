import React from "react";
import "./customer.scss";
import { Visa, Group, Group2, Discover } from "../../static/menuIcons";

const Payment = () => {
    return (
        <>
            <div className="payment">
                <h1>Payment Information</h1>
                <div className="row">
                    <div className="col-md-6 mb-5 payment-method">
                        <label htmlFor="name">Card holder name</label>
                        <input type="text" className="form-control" id="name" placeholder="Suleman Ahsan" />
                        <label htmlFor="number">card number</label>
                        <input type="text" className="form-control" id="number" placeholder="123 456 789" />
                        <div className="payment-icon">
                            <img className="icon-payment" src={Visa} alt="" />
                            <img className="icon-payment" src={Group} alt="" />
                            <img className="icon-payment" src={Group2} alt="" />
                            <img className="icon-payment" src={Discover} alt="" />
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6 mb-5">
                                <label htmlfor="inputEmail4" class="form-label">
                                    Expiry
                                </label>
                                <input type="email" class="form-control" id="inputEmail4" />
                            </div>
                            <div class="col-md-6">
                                <label htmlfor="cvc" class="form-label">
                                    CVC
                                </label>
                                <input type="password" class="form-control" id="cvc" />
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6 mb-5">
                                <label htmlfor="country" class="form-label">
                                    Country
                                </label>
                                <select
                                    class="custom-select"
                                    id="country"
                                    //   style={{ paddingLeft: "30px" }}
                                >
                                    <option selected>pakistan</option>
                                    <option value="1">india</option>
                                    <option value="2">lahore</option>
                                    <option value="3">karachi</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label htmlfor="postalcode" class="form-label">
                                    postal code
                                </label>
                                <input type="password" class="form-control" id="postalcode" />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
