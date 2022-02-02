import React from "react";
import { Link } from "react-router-dom";
import "./neworder.scss";
import { Col, Row } from "react-bootstrap";
const NewOrder = () => {
  return (
    <>
      <ul id="mynavul">
        <li>
          <Link to="" className="mynavlink">
            New Customer
          </Link>
        </li>
        <li>
          <Link to="" className="mynavlink">
            Exisiting Customer
          </Link>
        </li>
        <li>
          <Link to="" className="mynavlink">
            Lead
          </Link>
        </li>
      </ul>
      <Row>
        <Col xs={10} className="offset-1">
          <div>
            Name{""} <input type="text" className="mb-4 myinput" style={{ backgroundColor: "transparent", marginLeft: "12px" }} />
          </div>
          <div>
            Phone{""} <input type="text" className="mb-4 myinput" style={{ marginLeft: "10px" }} />
          </div>
          <div>
            Email{""} <input type="text" className="mb-4 myinput" style={{ marginLeft: "16px" }} />
          </div>
          <div>
            Country{""}
            <select className="mb-4 p-1 myinput" style={{ marginLeft: "5px" }}>
              <option className="text-muted" value="" selected>
                Please select a country
              </option>
              <option value="">india</option>
              <option value="">pakistan</option>
              <option value="">USA</option>
              <option value="">Uk</option>
            </select>
          </div>
          <div>
            City
            <select className="mb-4 py-1 myinput" style={{ marginLeft: "32px", paddingRight: "32px" }}>
              <option className="text-muted" value="" selected>
                Please select a city
              </option>
              <option value="">Delhi</option>
              <option value="">newYork</option>
              <option value="">London</option>
              <option value="">Lahore</option>
            </select>
          </div>
          <div>
            Address <input type="text" className="mb-4 myinput" style={{ marginLeft: "2px" }} />
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-8px" }}>Address 2</p> <input type="text" className="mb-4 myinput" />
          </div>
          <div>
            Courses
            <select className="mb-4  myinput" style={{ paddingRight: "95px", marginLeft: "10px" }}>
              <option value="" selected>
                Course 1
              </option>
              <option value="">Course 2</option>
              <option value="">Course 3</option>
              <option value="">Course 4</option>
              <option value="">Course 5</option>
            </select>
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-30px" }}>Starting Date</p>
            <input type="datetime-local" className="mb-4 myinput" style={{ marginLeft: "5px" }} />
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-20px" }}>Expire Date</p>
            <input type="datetime-local" className="mb-4 myinput" style={{ marginLeft: "5px" }} />
          </div>
          <div>
            <p style={{ display: "inline", marginLeft: "-55px" }}>Subscription Tier</p>
            <select className="mb-4  myinput" style={{ paddingRight: "95px", marginLeft: "5px" }}>
              <option value="" selected>
                Complementary
              </option>
              <option value=""> 2</option>
              <option value=""> 3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div>
          <div>Total</div>
          <div id="pricediv">
            <p>$0.00</p>
          </div>
          <button id="myaddbtn" style={{ marginLeft: "60px" }}>
            Add New
          </button>
        </Col>
      </Row>
    </>
  );
};

export default NewOrder;
