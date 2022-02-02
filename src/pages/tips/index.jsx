import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./tipindex.scss";
import Card from "./Card.jsx";
import { AppTopbar } from "../../AppTopbar";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TIpService from "../../services/TipService";
import { Spin } from "antd";
const Tips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTips();
  }, [])
  const getTips = () => {
    setTips([]);
    TIpService.getAll().then(({ data: { tips } }) => {
      setTips(tips);

    }).catch((err) => {
    }).finally(() => setLoading(false))
  }

  const delTip = (id) => new Promise((resolve, reject) => {
    TIpService.deletetip(id).then((result) => { }).catch((err) => { });
    setTimeout(() => {
      resolve(setTips([...tips.filter(({ _id }) => _id !== id)]));
    }, 200);
  })

  return (
    <>
      <nav class=" ps-4 navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home<span style={{ marginLeft: "10px" }}>/</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  Tips<span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  View Tips
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h5 className="fw-bold ms-4 mt-1">Tips List</h5>
      <Row className="ms-3">
        <Col xs={5}>
          <div class="addmycourse1 input-group mb-3">
            <input type="text" class="form-control" placeholder="input search text" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button class="btn btn-success" type="button" id="button-addon2">
              Search
            </button>
          </div>
        </Col>

        <Col xs={3} className="offset-4">
          <Row>
            <Col xs={2}></Col>
            <Col xs={10}>
              <Link className="" to="newCourse">
                <p className="addmycourse " style={{ backgroundColor: "#F1F1F1" }}>
                  +Add New Tip
                </p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="row mt-5" style={{ backgroundColor: "white" }}>
        {loading ? <Spin /> : <>{tips.map((tip) => (<Card tip={tip} delTip={delTip} />))}</>}
        {/* {!loading && tips.length ===0 && } */}
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
      </div>
    </>
  );
};

export default Tips;
