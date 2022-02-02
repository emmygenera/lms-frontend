import React from "react";
import { Row, Col } from "react-bootstrap";
const NewCompaign = () => {
    const [campaign, setCampaign] = React.useState({
        name: "",
        users: "",
        discription: "",
        sendFrom: "",
        date: "",
        sendDate: "",
        htmlEditor: "",
    });
    return (
        <>
            <div className="shadow-sm p-3 row mt-md-5">
                <div className="col-md-5">
                    <h5 className="offset-sm-3 mb-3">
                        <b className="mt-5">Campaign Information</b>
                    </h5>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end" style={{ fontSize: "0.9em" }}>
                            Campaign Name
                        </p>

                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control  myinput"
                                value={campaign.name}
                                onChange={(e) => {
                                    setCampaign({ ...campaign, name: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end" style={{ fontSize: "0.9em" }}>
                            Select Users/List
                        </p>
                        <div className="col-sm-7">
                            <select
                                className="col-sm-7 form-select form-control myinput"
                                value={campaign.users}
                                onChange={(e) => {
                                    setCampaign({ ...campaign, users: e.target.value });
                                }}
                            >
                                <option value="" selected>
                                    Click here to Pick from Leads and Customers or list..
                                </option>
                                <option value="">india</option>
                                <option value="">pak</option>
                                <option value="">uk</option>
                                <option value="">usa</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end" style={{ fontSize: "0.9em" }}>
                            Campaign Discription
                        </p>

                        <div className="col-sm-7">
                            <textarea
                                type="text"
                                className="form-control  myinput"
                                rows="4"
                                value={campaign.discription}
                                onChange={(e) => {
                                    setCampaign({ ...campaign, discription: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mb-2 mt-3">
                        <p className="col-sm-4 text-sm-end" style={{ fontSize: "0.9em" }}>
                            Send From
                        </p>

                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control  myinput"
                                value={campaign.sendFrom}
                                onChange={(e) => {
                                    setCampaign({ ...campaign, sendFrom: e.target.value });
                                }}
                            />
                        </div>
                    </div>

                    <div className="row mb-2">
                        <p className=" col-sm-4 text-sm-end" style={{ fontSize: "0.9em" }}>
                            Send Date
                        </p>
                        <div className="col-sm-7">
                            <input
                                className=" form-control myinput"
                                type="date"
                                value={campaign.date}
                                onChange={(e) => {
                                    setCampaign({ ...campaign, date: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <p className="col-sm-4 text-sm-end" style={{ fontSize: "0.9em" }}>
                            Send Date
                        </p>
                        <div className="col-sm-7">
                            <input
                                type="date"
                                className="form-control myinput"
                                value={campaign.sendDate}
                                onChange={(e) => {
                                    setCampaign({ ...campaign, sendDate: e.target.value });
                                }}
                            />
                        </div>
                    </div>

                    <div className="row ms-2">
                        <button id="mybtnupdate" className="col-2 offset-sm-4">
                            Add
                        </button>
                    </div>
                </div>
                <div className="col-sm-7">
                    <div className="row mb-2 mt-5">
                        <p className="col-sm-3 text-sm-end" style={{ fontSize: "0.9em" }}>
                            HTML Editor
                        </p>

                        <div className="col-sm-7">
                            <textarea
                                type="text"
                                className="form-control  myinput"
                                rows="25"
                                value={campaign.htmlEditor}
                                onChange={(e) => {
                                    setCampaign({ ...campaign, htmlEditor: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <Row className=" p-4" style={{ backgroundColor: "#FFFFFF" }}>
                <Col md={4} sm={6} className="offset-sm-1 mt-4">
                    <h5 style={{ paddingTop: "50px" }}>
                        <b>Compaign Information</b>
                    </h5>
                    <form>
                        <div class="mb-3 mt-1">
                            <label for="name" class="form-label">
                                Compaign Name
                            </label>
                            <input type="text" class="form-control" id="name" />
                        </div>
                        <div class="mb-3">
                            <label for="country" class="form-label">
                                Select Users
                            </label>
                            <select className="form-control form-select" id="country">
                                <option value="" selected>
                                    Click here to pick from users and customers
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="discription" class="form-label">
                                Campaign Discription
                            </label>
                            <textarea class="form-control" id="discription" />
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">
                                Send From
                            </label>
                            <input type="text" class="form-control" id="name" />
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">
                                Send Date
                            </label>
                            <input type="date" class="form-control" id="name" />
                        </div>

                        <button type="submit" class="btn" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            Add
                        </button>
                        <button type="submit" class="btn ms-2" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            Update
                        </button>
                    </form>
                </Col>
            </Row> */}
        </>
    );
};

export default NewCompaign;
