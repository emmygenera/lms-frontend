import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { jsonValue } from '../../../../applocal'
import CourseLesson from './CourseLesson'
import CourseLessopn from './CourseLesson'

const CourseAddon = ({ handleChange }) => {
  const [addOns, setAddOns] = useState([{ name: '', price: '', type: '', link: '' }])

  useEffect(() => {
    console.log(addOns)
    handleChange({ avl_addons: addOns })
  }, [jsonValue(addOns).toStringAll()])

  return (
    <Col md={6} className="" style={{ marginTop: '-100px', marginLeft: '40px' }}>
      <h5>
        <b>Avaliable Addons</b>
      </h5>
      {addOns.map(({ name = '', price = '', type = '', link = '' }, index) => (
        <React.Fragment key={index}>
          <Row className="justify-content-between" style={{ position: 'relative' }}>
            <Col md={7} className="pe-4">
              <Row className="align-items-center">
                <Col md={5} xs={6} className="mt-1 text-sm-end">
                  <p style={{ fontSize: '0.9em' }}>Addon Name</p>
                </Col>
                <Col md={7} xs={6} className="">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Live Trading Link"
                    value={name}
                    onChange={({ target: { value } }) => {
                      const _addOns = [...addOns]
                      _addOns[index].name = value
                      setAddOns(_addOns)
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="align-items-center" style={{ marginLeft: '-50px' }}>
                <Col sm={3} md={3} className="text-sm-end">
                  <p>price</p>
                </Col>
                <Col sm={6} md={7} className="">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="500 JD"
                    value={price}
                    onChange={({ target: { value } }) => {
                      const _addOns = [...addOns]
                      _addOns[index].price = value
                      setAddOns(_addOns)
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
          <Row className="justify-content-between" style={{ position: 'relative' }}>
            <Col md={7} className="pe-4">
              <Row className="align-items-center">
                <Col md={5} xs={6} className="mt-1 text-sm-end">
                  <p>Addon Type</p>
                </Col>
                <Col md={7} xs={6} className="">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Link"
                    value={type}
                    onChange={({ target: { value } }) => {
                      const _addOns = [...addOns]
                      _addOns[index].type = value
                      setAddOns(_addOns)
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="align-items-center" style={{ marginLeft: '-50px' }}>
                <Col sm={3} md={3} className="text-sm-end">
                  <p>Link</p>
                </Col>
                <Col sm={6} md={7} className="">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add Link here"
                    value={link}
                    onChange={({ target: { value } }) => {
                      const _addOns = [...addOns]
                      _addOns[index].link = value
                      setAddOns(_addOns)
                    }}
                  />
                </Col>
                <Col sm={3} md={2} className="">
                  <h2>
                    {index === addOns.length - 1 && addOns.length < 5 ? (
                      <i class="bi bi-plus" style={{ position: 'absolute', top: '0px', cursor: 'pointer' }} onClick={() => setAddOns([...addOns, { duration: 'One Month', price: '' }])}></i>
                    ) : (
                      <i class="bi bi-dash" style={{ position: 'absolute', top: '0px', cursor: 'pointer' }} onClick={() => setAddOns([...addOns.filter((item, _index) => index !== _index)])}></i>
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
  )
}

export default CourseAddon
