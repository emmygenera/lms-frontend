import React from 'react'
import CourseAddon from './CourseAddon'
import CustomerRating from './CustomerRating'
import { Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'

const CourseSection = ({ handleChange, data, initVals }) => {
  const [sections, setSections] = useState([
    { name: 'section 1', price: '' },
    { name: 'section 2', price: '' },
    { name: 'section 3', price: '' },
    { name: 'section 4', price: '' },
    { name: 'section 5', price: '' },
  ])

  useEffect(() => {
    // console.log(sections)
    handleChange({ course_sections: sections })
  }, [sections])

  return (
    <Row className="mt-2">
      <h5>
        <b>Course Sections</b>
      </h5>
      <Col md={5} className="">
        {sections.map((item, index) => (
          <Row key={index} className="align-items-center">
            <Col sm={3} md={3} className="text-sm-end">
              <p>price {index + 1}</p>
            </Col>
            <Col sm={6} md={6} className="">
              <input
                type="number"
                className="form-control"
                placeholder="500 JD"
                name={index}
                value={item.price}
                onChange={({ target: { value, name } }) => {
                  // const _sections = [...sections]
                  // _sections = [{ name: 'section ' + index, price: value }]
                  setSections(sections.map((itm, idx) => (idx == name ? { name: 'section ' + (idx + 1), price: value } : itm)))
                }}
              />
            </Col>
            <Col sm={3} md={3} className="mt-2">
              <h2 style={{ cursor: 'pointer' }} onClick={() => setSections([...sections.filter((item, _index) => index !== _index)])}>
                {sections.length !== 1 && <i class="bi bi-dash"></i>}
              </h2>
            </Col>
          </Row>
        ))}
        <CustomerRating handleChange={handleChange} data={data} initVals={initVals} />
      </Col>

      <CourseAddon handleChange={handleChange} initVals={initVals} />
    </Row>
  )
}

export default CourseSection
