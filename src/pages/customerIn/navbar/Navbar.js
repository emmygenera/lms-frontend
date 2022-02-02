import React from "react";
import { Row, Col } from "react-bootstrap";
import "./nav.scss";
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-dark" id="nav-bar" style={{ backgroundColor: "black", height: "80px" }}>
                <a className="navbar-brand">
                    <img src="assets/demo/images/logo.png" id="logo" className="img-fluid" alt="" />
                </a>
                <div className="justify-content-end">
                    <form className="d-flex  align-items-center" id="form">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{
                                borderRadius: "25px",
                                // width: "455px",
                                height: "37px",
                                marginTop: "-5px",
                                backgroundColor: "black",
                                color: "white",
                            }}
                        />
                        <i className="bi bi-search  text-white" id="search"></i>

                        <h1 className="me-5" type="submit" style={{ marginTop: "3px" }}>
                            <i className="bi bi-cart2  text-white"></i>
                        </h1>
                    </form>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
