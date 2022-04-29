import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { EmjsF, jsonValue } from "../../../../applocal";
import CourseLesson from "./CourseLesson";

const AvailableAddonsType = [
  { key: "link", value: "Link" },
  { key: "file", value: "File" },
];
const CourseAddon = ({ handleChange, initVals = [] }) => {
  const addonInit = { name: "", price: { usd: "", jod: "" }, type: "", link: "" };
  const [addOns, setAddOns] = useState([addonInit]);
  const add_ = jsonValue(addOns).toStringAll();
  useEffect(() => {
    // console.log(addOns)
    handleChange({ avl_addons: add_ });
  }, [add_]);
  useEffect(() => {
    const oldD = EmjsF(initVals.avl_addons).parse();

    if (oldD) setAddOns(oldD?.length == 0 ? [addonInit] : oldD);
  }, []);
  function onFileUpload(file, resolve = () => {}) {
    const file_r = new FileReader();
    file_r.onload = (e) => {
      const res = e.target.result;
      resolve(res);
    };
    file_r.readAsDataURL(file[0]);
  }
  // console.log(addOns);
  return (
    <Col md={12} className="" style={{ marginTop: "-.100px", marginTop: 40 }}>
      <h5>
        <b>Avaliable Addons</b>
      </h5>
      {addOns.map(({ name = "", price: { usd = "", jod = "" }, type = "", link = "" }, index) => (
        <React.Fragment key={index}>
          <Row className="justify-content-between" style={{ position: "relative" }}>
            <Col md={6} className="pe-4. p-0">
              <Row className="align-items-center">
                <Col md={5} xs={6} className="mt-1 text-sm-end">
                  <p style={{ fontSize: "0.9em" }}>Addon Name</p>
                </Col>
                <Col md={7} xs={6} className="">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Live Trading Link"
                    defaultValue={name}
                    onChange={({ target: { value } }) => {
                      const _addOns = [...addOns];
                      _addOns[index].name = value;
                      setAddOns(_addOns);
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row className="align-items-center" style={{ marginLeft: "-50px" }}>
                <Col sm={3} md={3} className="text-sm-end">
                  <p>price</p>
                </Col>
                <Col sm={4} md={4} className="p-0">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="USD"
                    defaultValue={usd}
                    onChange={({ target: { value } }) => {
                      const _addOns = [...addOns];
                      _addOns[index].price.usd = value;
                      setAddOns(_addOns);
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
                      const _addOns = [...addOns];
                      _addOns[index].price.jod = value;
                      setAddOns(_addOns);
                    }}
                  />
                </Col>
                {/* <Col sm={3} md={2} className="">
                                    <h2>
                                        <i class="bi bi-plus" style={{ position: "absolute", top: "0px" }}></i>
                                    </h2>
                                </Col> */}
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-between" style={{ position: "relative" }}>
            <Col md={6} className="pe-4. p-0">
              <Row className="align-items-center">
                <Col md={5} xs={6} className="mt-1 text-sm-end">
                  <p>Addon Type</p>
                </Col>
                <Col md={7} xs={6} className="">
                  <select
                    type="text"
                    className="form-control"
                    placeholder="Select Type"
                    defaultValue={type}
                    onChange={({ target: { value } }) => {
                      const _addOns = [...addOns];
                      _addOns[index].type = value;
                      setAddOns(_addOns);
                    }}
                  >
                    <option value="">Select Type</option>
                    {AvailableAddonsType.map((itm) => (
                      <option value={itm.key}>{itm.value}</option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row className="align-items-center" style={{ marginLeft: "-50px" }}>
                <Col sm={3} md={3} className="text-sm-end">
                  <p>Link</p>
                </Col>
                <Col sm={6} md={7} className="">
                  <input
                    type={addOns[index]?.type == "file" ? "file" : "text"}
                    className="form-control"
                    placeholder="Add Link here"
                    defaultValue={link}
                    onChange={({ target }) => {
                      const _addOns = [...addOns];
                      _addOns[index].type == "file"
                        ? onFileUpload(target?.files, (v) => {
                            _addOns[index].link = v;
                          })
                        : (_addOns[index].link = target?.value);
                      setAddOns(_addOns);
                    }}
                  />
                </Col>
                <Col sm={3} md={2} className="">
                  <h2>
                    {index === addOns.length - 1 && addOns.length < 5 ? (
                      <i class="bi bi-plus" style={{ position: "absolute", top: "0px", cursor: "pointer" }} onClick={() => setAddOns([...addOns, addonInit])}></i>
                    ) : (
                      <i class="bi bi-dash" style={{ position: "absolute", top: "0px", cursor: "pointer" }} onClick={() => setAddOns([...addOns.filter((item, _index) => index !== _index)])}></i>
                    )}
                  </h2>
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      ))}
      {/* <CourseLesson /> */}
    </Col>
  );
};

export default CourseAddon;
