import React from "react";
import CourseAddon from "./CourseAddon";
import CustomerRating from "./CustomerRating";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { EmjsF, Range } from "../../../../applocal";

const CourseSection = ({ submitting, handleChange, data, initVals }) => {
  // const [isS, setisS] = useState(false);
  const [sections, setSections] = useState(Range(1, 5, sectionPlaceHolder));
  useEffect(() => {
    if (initVals?.course_sections) setSections(EmjsF(initVals?.course_sections).parse());
    // setisS(true);
  }, []);

  function mergeAObject(val1 = [], val2 = []) {
    if (!EmjsF(val2).isArray()) {
      return val1;
    }
    return val1.map((item, idx) => (val2[idx]?.key == item?.key ? val2[idx] : item));
  }
  function sectionPlaceHolder(idx = 1, name = "") {
    return { key: "section" + idx, name };
  }

  // console.log("course_sections: ", initVals.course_sections);
  const _sect = EmjsF(sections).toString();
  useEffect(() => {
    // console.log("course_sections: ", initVals.course_sections);
    handleChange({ course_sections: _sect });
  }, [_sect]);
  // console.log(sections);
  // if (!isS) {
  //   return (
  //     <>
  //       <div />
  //     </>
  //   );
  // }

  return (
    <Row className="mt-2">
      {/* <h5>
        <b>Course Sections</b>
      </h5> */}
      <Col md={5} className="">
        {/*  {sections.map((item, index) => (
          <Row key={index} className="align-items-center">
            <Col sm={4} md={4} className="text-sm-end">
              <p>Section Name</p>
            </Col>
            <Col sm={6} md={6} className="">
              <input
                type="text"
                className="form-control"
                placeholder={"Section " + (index + 1)}
                name={item.key}
                value={item.name}
                onChange={({ target: { value, name } }) => {
                  // const _sections = [...sections]
                  // _sections = [{ name: 'section ' + index, price: value }]
                  setSections(sections.map((itm, idx) => (itm.key == name ? { key: "section" + (idx + 1), name: value } : itm)));
                }}
              />
            </Col>
            <Col sm={2} md={2} className="mt-2">
              {index == 0 ? (
                <button type="button" className="btn btn-sm p-1" style={{ cursor: "pointer" }} onClick={() => setSections([...sections, sectionPlaceHolder(sections.length + 1)])}>
                  {sections.length !== 50 && <i class="fz-5 bi bi-plus"></i>}
                </button>
              ) : (
                <button type="button" className="btn btn-sm p-1" style={{ cursor: "pointer" }} onClick={() => setSections([...sections.filter((item, _index) => index !== _index)])}>
                  {sections.length !== 1 && <i class="fz-5 bi bi-dash"></i>}
                </button>
              )}
            </Col>
          </Row>
        ))}
      */}
        <CustomerRating submitting={submitting} handleChange={handleChange} data={data} initVals={initVals} />
      </Col>

      {/* <CourseAddon handleChange={handleChange} initVals={initVals} /> */}
    </Row>
  );
};

export default CourseSection;
/*


*/
