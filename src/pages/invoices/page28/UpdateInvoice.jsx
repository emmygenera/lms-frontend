import React from "react";

const UpdateInvoice = () => {
    return (
        <>
            <div className="row mt-md-5">
                <div className=" col-md-5">
                    <h5 className="offset-sm-3 mb-3">
                        <b>Invoice Information</b>
                    </h5>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-5 text-sm-end">Invoice ID</p>
                        <input type="text" className="col-sm-7 myinput" />
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">Order ID</p>
                        <input type="text" className="col-sm-7 myinput" />
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-5 text-sm-end">Client Name</p>
                        <input type="text" className="col-sm-7 myinput" />
                    </div>

                    <div className="row mb-2">
                        <p className=" col-sm-5 text-sm-end">Invoice Data</p>
                        <input className="col-sm-7 myinput" type="text" />
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-5 text-sm-end">Payment Date</p>
                        <input className="col-sm-7 myinput" type="text" />
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-5 text-sm-end">Status</p>
                        <input className="col-sm-7 myinput" type="text" />
                    </div>

                    <div className="row ">
                        <button id="mybtnupdate" className="mb-4 col-2 offset-sm-5">
                            Update
                        </button>
                    </div>
                </div>
                <div className=" col-md-5">
                    <h5 className="offset-sm-3 mb-3">
                        <b>Courses</b>
                    </h5>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-7 text-sm-end">Live Trading Course</p>
                        <input type="text" className="col-sm-5 myinput" value="1 Month 2000 JOD" />
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-7 text-sm-end">Monetary Rules Course</p>
                        <input type="text" className="col-sm-5 myinput" value="1 Month 2000 JOD" />
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-7 text-sm-end">Angular Course</p>
                        <input type="text" className="col-sm-5 myinput" value="1 Month 2000 JOD" />
                    </div>

                    <div className="row mb-2">
                        <p className=" col-sm-7 text-sm-end">Discount</p>
                        <input className="col-sm-5 myinput" type="text" value="1 Month 2000 JOD" />
                    </div>
                    <div className="row my-2">
                        <p className="col-sm-8 text-sm-end">
                            <b>Total 5400 JOD</b>
                        </p>
                    </div>
                    <div className="row mt-3">
                        <button id="mybtnupdate" className="col-2 offset-sm-3 ">
                            REVIEW
                        </button>
                        <button id="mybtnupdate" className="col-2 ms-1">
                            PRINT
                        </button>
                        <button id="mybtnupdate" className="col-2 ms-1">
                            REFUND
                        </button>
                        <button id="mybtnupdate" className="col-2 ms-1">
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateInvoice;
