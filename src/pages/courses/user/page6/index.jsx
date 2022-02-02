import React from "react";
import "./page6.scss";
import Tables from "./Table";
import { Row, Col } from "react-bootstrap";

const SixthPage = () => {
    return (
        <>
            <div class="container">
                <div className="div1 p-2 mt-2">
                    <h5 className="div1p1">Ali Pay Course</h5>
                    <p className="div1p2">Durations</p>
                    <select className="div1select ">
                        <option value="">1 Month 500 JOD</option>
                        <option value="">2 Month 600 JOD</option>
                        <option value="">3 Month 700 JOD</option>
                        <option value="">4 Month 800 JOD</option>
                        <option value="">5 Month 900 JOD</option>
                    </select>
                    <button className="div1btn">Add to Cart</button>
                    <i class="div1icon rounded-circle bi bi-three-dots-vertical" style={{ padding: "8px 12px 8px 12px" }}></i>
                </div>
                <Row className="div2 shadow-sm mx-2 rounded  justify-content-around mt-2" style={{}}>
                    <Col md={7} className="py-5 px-2 ">
                        <h3>Course Description</h3>
                        <p className="mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti impedit ipsa dolorem adipisci eum id consequatur, ad consectetur fuga tempore hic iusto, doloribus perspiciatis tempora veritatis. Nemo rem unde dolor.Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempore, at! Ad aliquid eos vero sit neque perferendis illo fugit ipsam labore voluptas nihil possimus, tempore, molestiae dignissimos rerum ullam magni!
                        </p>
                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis explicabo aspernatur quod sit commodi maxime praesentium laudantium ratione dolor, placeat nisi quam non. Eveniet sed dicta aut praesentium. Nulla.</p>
                    </Col>
                    <Col md={3} className="mt-5">
                        <div className="mt-4 d-flex align-items-center justify-content-center">
                            <span className="" style={{ marginLeft: "-30px" }}>
                                <h4 style={{ color: "blue" }}>
                                    <i class="bi bi-currency-dollar"></i>
                                </h4>
                            </span>
                            <span className="ms-3">
                                <p className=" text-muted">
                                    <pre>Course Price</pre>
                                </p>
                                <h6>
                                    <b>1 Month JOD500.0</b>
                                </h6>
                            </span>
                        </div>
                        <div className="mt-4 d-flex align-items-center justify-content-center">
                            <span className="">
                                <h4 style={{ color: "blue" }}>
                                    <i class="bi bi-calendar4-week"></i>
                                </h4>
                            </span>
                            <span className="ms-3">
                                <p className=" text-muted">Date</p>
                                <h6>
                                    <b>Sunday, 12 June 2021</b>
                                </h6>
                            </span>
                        </div>
                    </Col>
                </Row>
                <div className="row mt-8">
                    <Tables />
                </div>
            </div>
        </>
    );
};

export default SixthPage;
