import React from "react";

const NewList = () => {
    return (
        <>
            <div className="row mt-md-5">
                <div className=" col-md-7">
                    <p className="offset-sm-3 mb-3">
                        <b>List Information</b>
                    </p>

                    <div className="row mb-2">
                        <p className=" col-sm-4 text-end">List Name</p>
                        <div className="col-sm-7">
                            <input className="form-control myinput" type="text" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-4 text-end">Select Users</p>
                        <div className="col-sm-7">
                            <select className="form-control myinput">
                                <option value="" selected>
                                    Click here to pick from users and customers
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">2</option>
                                <option value="">3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-4 text-end">List Discription</p>
                        <div className="col-sm-7">
                            <textarea row="7" className="form-control myinput" />
                        </div>
                    </div>
                    <span style={{ marginLeft: "9em" }}>
                        <button id="mybtnupdate" className="p-2 ms-5">
                            Add
                        </button>
                        <button id="mybtnupdate" className="p-2 ms-4">
                            Update
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
};

export default NewList;
