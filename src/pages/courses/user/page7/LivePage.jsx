import React from "react";
import "./livetrading.scss";
import Table from "./Table";

const LivePage = () => {
    return (
        <>
            <div>
                <div>
                    <div className="shadow-sm  div1 p-2 mt-2">
                        <p className="div1p1">Ali Pay Course</p>
                        <button className="divbtn1">Mark As Complete</button>
                        <button className="div1btn">Next Lesson</button>
                    </div>
                </div>
                <div className="rounded shadow-sm div2 row justify-content-evenly mt-2 p-2">
                    <div className="col-md-7 pt-3">
                        <h3>Course Discription</h3>
                        <p className="mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti impedit ipsa dolorem adipisci eum id consequatur, ad consectetur fuga tempore hic iusto, doloribus perspiciatis tempora veritatis. Nemo rem unde dolor.Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempore, at! Ad aliquid eos vero sit neque perferendis illo fugit ipsam labore voluptas nihil possimus, tempore, molestiae dignissimos rerum ullam magni!
                        </p>
                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis explicabo aspernatur quod sit commodi maxime praesentium laudantium ratione dolor, placeat nisi quam non. Eveniet sed dicta aut praesentium. Nulla.</p>
                    </div>
                    <div className="col-md-3 mt-3 div2div2">
                        <div style={{ position: "relative" }}>
                            <h4 id="dollaricon" style={{ color: "blue" }}>
                                <i class="bi bi-currency-dollar"></i>
                            </h4>
                            <p id="dollarp" className=" text-muted">
                                <pre>Course Price</pre>
                            </p>
                            <h6 id="dollarh">
                                <pre>1 Month JOD500.0</pre>
                            </h6>
                        </div>
                        <div style={{ position: "relative" }}>
                            <h4 id="calendericon" style={{ color: "blue" }}>
                                <i class="bi bi-calendar4-week"></i>
                            </h4>
                            <p id="calenderp" className="text-muted">
                                Date
                            </p>
                            <h6 id="calenderh">Sunday, 12 June 2021</h6>
                        </div>
                        <div style={{ position: "relative" }}>
                            <h4 id="locationicon" style={{ color: "blue" }}>
                                <i class="bi bi-geo-alt"></i>
                            </h4>
                            <p id="locationp" className="text-muted">
                                Location
                            </p>
                            <h6 id="locationh">Blue Corner St. 123566 Franklin Avenue, London</h6>
                        </div>
                    </div>
                </div>
                <div className="rounded shadow-sm div3 mt-5 pt-5 px-5">
                    <h3>Attachments and Addons</h3>
                    <Table />
                </div>
            </div>
        </>
    );
};

export default LivePage;
