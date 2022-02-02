import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const Package = ({ handleChange }) => {
  const [packages, setPackages] = useState([{ duration: 'One Month', price: '' }])

  useEffect(() => {
    handleChange({ avl_packages: packages })
  }, [packages])

  return (
    <Col md={6} style={{ marginLeft: '40px' }}>
      <h5>
        <b>Package Avaliable</b>
      </h5>
      {packages.map(({ duration, price }, index) => (
        <Row className="justify-content-between">
          <Col md={7} className="pe-4">
            <Row className="align-items-center">
              <Col md={5} xs={6} className="text-sm-end">
                <p style={{ fontSize: '0.9em' }}>package duration</p>
              </Col>
              <Col md={7} xs={6} className="mb-1">
                <select
                  class="form-select"
                  onChange={({ target: { value } }) => {
                    const _packages = [...packages]
                    _packages[index].duration = value
                    setPackages(_packages)
                  }}
                >
                  <option selected>One Month</option>
                  <option value="One Month">One Month</option>
                  <option value="Two Month">Two Month</option>
                  <option value="Three Month">Three Month</option>
                </select>
              </Col>
            </Row>
          </Col>
          <Col md={4} style={{ position: 'relative' }}>
            <Row className="  align-items-center" style={{ marginLeft: '-50px' }}>
              <Col sm={3} md={3} className="">
                <p>price</p>
              </Col>
              <Col sm={6} md={7} className="">
                <input
                  type="number"
                  className="form-control"
                  placeholder="500 JD"
                  onChange={({ target: { value } }) => {
                    const _packages = [...packages]
                    _packages[index].price = value
                    setPackages(_packages)
                  }}
                />
              </Col>
              <Col sm={1} md={2} className="">
                <h2>
                  {/* && packages[packages.length - 1].price.length > 0 */}
                  {index === packages.length - 1 && packages.length < 5 ? (
                    <i class="bi bi-plus" style={{ position: 'absolute', top: '0px', cursor: 'pointer' }} onClick={() => setPackages([...packages, { duration: 'One Month', price: '' }])}></i>
                  ) : (
                    <i class="bi bi-dash" style={{ position: 'absolute', top: '0px', cursor: 'pointer' }} onClick={() => setPackages([...packages.filter((item, _index) => index !== _index)])}></i>
                  )}
                </h2>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </Col>
  )
}

export default Package
