import React from "react";
import "./thirdpage.scss";
import Table from "./Table";

const ThirdPage = () => {
    return (
        <>
            <div class="container">
                <div className="div1 p-2 mt-2">
                    <p className="div1p1">Ali Pay Course</p>
                    <p className="div1p2">Durations</p>
                    <select className="div1select">
                        <option value="">1 Month 500 JOD</option>
                        <option value="">2 Month 600 JOD</option>
                        <option value="">3 Month 700 JOD</option>
                        <option value="">4 Month 800 JOD</option>
                        <option value="">5 Month 900 JOD</option>
                    </select>
                    <button className="div1btn">Add to Cart</button>
                    <i class="div1icon bi bi-three-dots-vertical"></i>
                </div>
                <div className="div2 row justify-content-evenly mt-2">
                    <div className="shadow-sm col-md-7 p-5 rounded">
                        <h3>Course Description</h3>
                        <p className="mt-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti impedit ipsa dolorem adipisci eum id consequatur, ad consectetur fuga tempore hic iusto, doloribus perspiciatis tempora veritatis. Nemo rem unde dolor.Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempore, at! Ad aliquid eos vero sit neque perferendis illo fugit ipsam labore voluptas nihil possimus, tempore, molestiae dignissimos rerum ullam magni!
                        </p>
                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis explicabo aspernatur quod sit commodi maxime praesentium laudantium ratione dolor, placeat nisi quam non. Eveniet sed dicta aut praesentium. Nulla.</p>
                    </div>
                    <div className="shadow-sm rounded col-md-3 mt-3 p-3 div2div2">
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
                    </div>
                </div>
                <div className="div3 mt-5 pt-5 px-5">
                    <Table />
                </div>
            </div>
        </>
    );
};

export default ThirdPage;
