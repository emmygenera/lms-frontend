import React from "react";
import "./orders.scss";
const UpdateOrder = () => {
    return (
        <>
            <div className="row mt-5">
                <div className=" col-sm-5 mt-10">
                    <h5 className="offset-sm-3 mb-4">
                        <b>Customer Information</b>
                    </h5>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Name</p>
                        <div className="col-sm-7">
                            <input type="text" className="form-control myinput" />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Phone</p>
                        <div className="col-sm-7">
                            <input type="text" className="form-control myinput" />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Email</p>
                        <div className="col-sm-7">
                            <input type="text" className="form-control myinput" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">Country</p>
                        <div className="col-sm-7">
                            <select className="form-control myinput">
                                <option value="" selected>
                                    Please select a country
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">City</p>
                        <div className="col-sm-7">
                            <select className="form-control myinput">
                                <option value="" selected>
                                    Please select a City
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Address</p>
                        <div className="col-sm-7">
                            <input type="text" className="form-control myinput" />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Address 2</p>
                        <div className="col-sm-7">
                            <input type="text" className="form-control myinput" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">Courses</p>
                        <div className="col-sm-7">
                            <select className="form-control myinput">
                                <option value="" selected>
                                    COURSE 01
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Start Date</p>
                        <div className="col-sm-7">
                            <input type="date" className="form-control myinput" />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Expire Date</p>
                        <div className="col-sm-7">
                            <input type="date" className="form-control myinput" />
                        </div>
                    </div>

                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">Subscription Tier</p>
                        <div className="col-sm-7">
                            {" "}
                            <select className="form-control myinput">
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

                    <div className="row my-4">
                        <p className=" col-sm-5 m-1 text-sm-end">Total</p>
                        <p className=" col-sm-3 pt-1 pricep">$0.00</p>
                    </div>
                    <div className="row my-2">
                        <button id="mybtnupdate" className="col-sm-3 offset-sm-5">
                            Add New
                        </button>
                    </div>
                </div>
                <div className="col-sm-5 mt-10">
                    <h5 className="ms-4">
                        <b>Course Information</b>
                    </h5>
                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">Courses</p>
                        <div className="col-sm-7">
                            <select className="form-control myinput">
                                <option value="" selected>
                                    COURSE 01
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">Package Available</p>
                        <div className="col-sm-7">
                            {" "}
                            <select className="form-control myinput">
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
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Start Date</p>
                        <div className="col-sm-7">
                            <input type="date" className="form-control myinput" />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Expire Date</p>
                        <div className="col-sm-7">
                            <input type="date" className="form-control myinput" />
                        </div>
                    </div>

                    <div className="row my-4">
                        <p className=" col-sm-5 m-1 text-sm-end">Total</p>
                        <p className=" col-sm-3 pt-1 pricep">$0.00</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateOrder;
