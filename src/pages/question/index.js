import React from "react";
import { Col, Row } from "react-bootstrap";
import Questions from "./Question";

const Question = () => {
    return (
        <>
            <div className="mt-7" style={{ padding: "55px", backgroundColor: "#ffffff", borderRadius: "25px" }}>
                <Questions />
            </div>
            <div className="" style={{ position: "relative", marginTop: "50px", padding: "55px", backgroundColor: "#ffffff", borderRadius: "25px" }}>
                <Row className="">
                    <Col md={4} className="">
                        <img src="images/Ellipse 111.png" className="img-fluid" style={{ width: "49px", height: "45px" }} />
                    </Col>
                    <Col md={8} className="align-items-center" style={{ position: "absolute", left: "105px", top: "65px" }}>
                        <h6 style={{ marginBottom: "-5px", fontWeight: "bold" }}>Suleman Ahsan</h6>
                        <span style={{ fontSize: "0.7em" }}>Technical Support</span>
                    </Col>
                </Row>
                <Row className="">
                    <Col className="ml-2 mt-3">
                        <h5>lorem ipsum dolor sit amet, consectetur adip</h5>
                    </Col>
                </Row>
                <Row className="mt-5 ">
                    <div className="">
                        <button className="btn  text-white " style={{ backgroundColor: "#BC1819", marginLeft: "5px", width: "75px", height: "30px" }}>
                            Reply
                        </button>
                        <button className="btn text-white" style={{ backgroundColor: "#BC1819", marginLeft: "35px", height: "30px" }}>
                            Close Question
                        </button>
                    </div>
                </Row>
            </div>
        </>
    );
};

export default Question;
