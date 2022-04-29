import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { EmjsF, jsonValue } from "../../../../applocal";
import { packages as _packages } from "../../component/Data.json";

const Package = ({ handleChange, initVals = [] }) => {
  const initObj = { duration: "one_month", price: { usd: "", jod: "" } };
  const [packages, setPackages] = useState([initObj]);
  const pkg = jsonValue(packages).toStringAll();
  useEffect(() => {
    const oldD = EmjsF(initVals.avl_packages).parse();
    // console.log(oldD);
    if (oldD) setPackages(oldD.length == 0 ? [initObj] : oldD);
  }, []);

  useEffect(() => {
    handleChange({ avl_packages: pkg });
  }, [pkg]);

  return (
    <Col md={12} style={{ marginLeft: ".40px" }}>
      <h5>
        <b>Package Avaliable</b>
      </h5>
      {packages.map(({ duration, price: { usd, jod } }, index) => (
        <Row className="justify-content-between">
          <Col md={6} className="pe-4. p-0">
            <Row className="align-items-center">
              <Col md={5} xs={6} className="text-sm-end">
                <p style={{ fontSize: "0.9em" }}>package duration</p>
              </Col>
              <Col md={7} xs={6} className="mb-1. p-0">
                <select
                  class="form-select"
                  defaultValue={duration}
                  onChange={({ target: { value } }) => {
                    const _packages = [...packages];
                    _packages[index].duration = value;
                    setPackages(_packages);
                  }}
                >
                  <option selected>Select Course Packages</option>
                  {_packages.map(({ key, value }) => (
                    <option value={key} index={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="p-0" style={{ position: "relative" }}>
            <Row className="  align-items-center" style={{ marginLeft: "-5.0px" }}>
              <Col sm={2} md={2} className="pr-1">
                <p>price </p>
              </Col>
              <Col sm={4} md={4} className=" p-0 px-1">
                <input
                  type="number"
                  className="form-control"
                  placeholder="USD"
                  defaultValue={usd}
                  onChange={({ target: { value } }) => {
                    const _packages = [...packages];
                    _packages[index].price.usd = value;
                    setPackages(_packages);
                  }}
                />
              </Col>
              <Col sm={4} md={4} className="p-0">
                <input
                  type="number"
                  className="form-control"
                  placeholder="JOD"
                  defaultValue={jod}
                  onChange={({ target: { value } }) => {
                    const _packages = [...packages];
                    _packages[index].price.jod = value;
                    // console.log(_packages);
                    setPackages(_packages);
                  }}
                />
              </Col>
              <Col sm={2} md={2} className="">
                <h2>
                  {/* && packages[packages.length - 1].price.length > 0 */}
                  {index === packages.length - 1 && packages.length < 5 ? (
                    <i class="bi bi-plus" style={{ position: "absolute", top: "0px", cursor: "pointer" }} onClick={() => setPackages([...packages, initObj])}></i>
                  ) : (
                    <i class="bi bi-dash" style={{ position: "absolute", top: "0px", cursor: "pointer" }} onClick={() => setPackages([...packages.filter((item, _index) => index !== _index)])}></i>
                  )}
                </h2>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </Col>
  );
};

export default Package;
