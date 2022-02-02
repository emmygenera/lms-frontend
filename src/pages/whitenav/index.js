import React from "react";
import { Row, Col } from "react-bootstrap";
// import { notification, chat, menu } from "../../static/menuIcons";
import "./whitenav.scss";

const Nav = () => {
    return (
        <>
            <Row className="justify-content-center">
                <Col lg={4} className="">
                    <h1>
                        <i className="bi bi-list mr-4"></i>Dashboard
                    </h1>
                </Col>
                <Col lg={4} className="">
                    <form className="d-flex  align-items-center">
                        <input className="form-control " type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </Col>
                <Col lg={4} className="">
                    {/* <img src={notification} className="img-fluid" alt="" />
                    <img src={chat} className="img-fluid" alt="" />
                    <img src={menu} className="img-fluid" alt="" /> */}
                </Col>
            </Row>
        </>
    );
};

export default Nav;
