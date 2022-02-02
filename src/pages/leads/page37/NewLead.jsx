import { Button } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Lead from "../../../services/leads";
const NewLead = ({ history }) => {
    const [lead, setLead] = React.useState({
        name: "",
        phone: "",
        email: "",
        country: "",
        city: "",
        address: "",
        course: "",
        privateNote: "",
    });
    const [loading, setLoading] = useState(false);


    const addNew = () => {
        setLoading(true)
        Lead.add(lead).then((result) => {
            history.push('/leads')
            // console.log(result)
        }).finally(() => setLoading(false))
    }

    return (
        <>
            <div className="shadow-sm p-3 row mt-md-5">
                <div className=" col-md-7">
                    <h5 className="offset-sm-3 mb-3 mt-5">
                        <b>Lead Information</b>
                    </h5>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end">Name</p>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control myinput"
                                value={lead.name}
                                onChange={(e) => setLead({ ...lead, name: e.target.value })}

                            />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end">Phone</p>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control myinput"
                                value={lead.phone}
                                onChange={(e) => setLead({ ...lead, phone: e.target.value })}

                            />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end">Email</p>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control myinput"
                                value={lead.email}
                                onChange={(e) => setLead({ ...lead, email: e.target.value })}

                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end">Country</p>
                        <div className="col-sm-7">
                            <select
                                className="form-control form-select myinput"
                                value={lead.country}
                                onChange={(e) => setLead({ ...lead, country: e.target.value })}
                            >
                                <option value="" selected>
                                    Please select a country
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end">City</p>
                        <div className="col-sm-7">
                            <select
                                className="form-control form-select myinput"
                                value={lead.city}
                                onChange={(e) => setLead({ ...lead, city: e.target.value })}
                            >
                                <option value="" selected>
                                    Please select a city
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end">Address</p>
                        <div className="col-sm-7">
                            <input
                                className="form-control myinput"
                                type="text"
                                value={lead.address}
                                onChange={(e) => setLead({ ...lead, address: e.target.value })}

                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end">Please a Course</p>
                        <div className="col-sm-7">
                            <select
                                className="form-control form-select myinput"
                                value={lead.course}
                                onChange={(e) => setLead({ ...lead, course: e.target.value })}
                            >
                                <option value="" selected>
                                    Please select Interested Course
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">2</option>
                                <option value="4">3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-4 text-sm-end">Private Notes</p>
                        <div className="col-sm-7">
                            <textarea
                                rows="4"
                                className="form-control myinput"
                                value={lead.privateNote}
                                onChange={(e) => setLead({ ...lead, privateNote: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 col-md-1 offset-sm-4  offset-md-4">
                            {/* <button id="btnupdate">Update</button> */}
                            <Button
                                // className='mt-2 col-2 offset-sm-4'
                                type="primary"
                                danger
                                backgroundColor={'red'}
                                onClick={addNew}
                                loading={loading}
                                id="btnupdate"
                            >
                                Update
                            </Button>
                        </div>
                        <div className="col-3">
                            <button id="btnupdate">New order</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Row className="shadow-sm  p-4" style={{ backgroundColor: "#FFFFFF" }}>
                <Col md={4} sm={6} className="offset-sm-1 mt-4">
                    <h5 style={{ paddingTop: "50px" }}>
                        <b>Lead Information</b>
                    </h5>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">
                                Name
                            </label>
                            <input type="text" class="form-control" id="name" />
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Phone
                            </label>
                            <input type="text" class="form-control" id="discription" />
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Email
                            </label>
                            <input type="text" class="form-control" id="discription" />
                        </div>

                        <div class="mb-3">
                            <label for="country" class="form-label">
                                Country
                            </label>
                            <select className="form-control form-select" id="country">
                                <option value="" selected>
                                    Please select a Country
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">
                                City
                            </label>
                            <select className="form-control form-select" id="city">
                                <option value="" selected>
                                    Please select a City
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Address
                            </label>
                            <input type="text" class="form-control" id="discription" />
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">
                                Course
                            </label>
                            <select className="form-control form-select" id="city">
                                <option value="" selected>
                                    Please select a Course
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Private Notes
                            </label>
                            <textarea class="form-control" id="discription" />
                        </div>

                        <button class="btn " style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            Add
                        </button>
                        <button class="btn  ms-2" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            Update
                        </button>
                    </form>
                </Col>
            </Row> */}
        </>
    );
};

export default NewLead;
