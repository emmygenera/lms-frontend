import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './newinstructor.scss'
import { Row, Col } from 'react-bootstrap'
import { Button, Form, Input } from 'antd'
import PicturesWall from '../../../components/upload'
import Instructor from '../../../services/instructor'
import Country from '../../../components/CountriesDropdown'
import { getCountryName } from '../../../utils/getCities'
import qs from 'query-string'
import { EmjsF } from '../../../applocal'

const NewInstructor = ({ history, location }) => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true })

  const [loading, setLoading] = useState(false)
  const [attachments, setImages] = useState([])
  const [otherFieldValues, setOtherFieldValues] = useState({})

  const onSetFieldValues = ({ target: { name, value } }) => {
    setOtherFieldValues({ ...otherFieldValues, [name]: value })
  }

  const initVals = params && params.data ? JSON.parse(params.data) : null

  const addNew = (instructor) => {
    instructor.country = getCountryName(instructor.country)
    setLoading(true)

    const fdata = new FormData()
    EmjsF({ ...instructor, files: attachments }).objList(({ key, value }) => {
      fdata.append(key, value)
    })
    if (initVals) {
      const insid = initVals._id
      fdata.append('id', insid)
      Instructor.updateOne(fdata, insid)
        .then((result) => history.push('/instructor'))
        .finally(() => setLoading(false))
    } else {
      Instructor.add(fdata)
        .then((result) => history.push('/instructor'))
        .finally(() => setLoading(false))
    }
  }

  return (
    <>
      <div className="shadow-sm p-3 row mt-md-5">
        <div className="col-md-5">
          <h5 className="offset-sm-3 mb-3">
            <b>Instructor Information</b>
          </h5>
          <Form name="wrap" labelCol={{ flex: '130px' }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew} initialValues={initVals}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Country />
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Private Note" name="private_note" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-2 offset-sm-4" type="primary" danger backgroundColor={'red'} htmlType="submit" loading={loading} id="mybtnupdate">
                {initVals ? 'Update' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-7 ">
          <h5 className="offset-sm-2 mb-3">
            <b>Instructor Courses</b>
          </h5>
          <div className="row mb-2">
            <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: '0.9em' }}>
              Live Trading Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select onChange={onSetFieldValues} name="live_trading_courses" className="col-sm-8 form-select form-control  myinput">
                <option value="1" selected>
                  Active
                </option>
                <option value="">Expiry</option>
              </select>
            </div>
          </div>
          <div className="row mb-2 mt-1">
            <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: '0.9em' }}>
              Monetary Rules Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select onChange={onSetFieldValues} name="manetary_rules_courses" className="col-sm-8 form-select form-control  myinput">
                <option value="1" selected>
                  Active
                </option>
                <option value="2">On Hold</option>
                <option value="">Expiry</option>
              </select>
            </div>
          </div>
          <div className="row mb-2 mt-1">
            <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: '0.9em' }}>
              Angular Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select onChange={onSetFieldValues} name="angular_courses" className="col-sm-8 form-select form-control  myinput">
                <option value="1" selected>
                  Active
                </option>
                <option value="">Expiry</option>
              </select>
            </div>
          </div>
          <div className="row mb-2 mt-1">
            <p className="offset-sm-1 col-sm-4 text-sm-end mt-2" style={{ fontSize: '0.9em' }}>
              TS Script Course
            </p>
            <div className="col-sm-3 align-items-center">
              <select onChange={onSetFieldValues} name="ts_script_courses" className="col-sm-8 form-select form-control  myinput">
                <option value="1" selected>
                  Active
                </option>
                <option value="">Expiry</option>
              </select>
            </div>
          </div>
          <div className="mt-3 offset-sm-2">
            <h5>
              <b>Instructor Attachments</b>
            </h5>
          </div>
          <div className="row">
            <div className="col-9 py-5 ps-5 offset-sm-1 align-items-center justify-content-center mt-2 " style={{ backgroundColor: '#F2F4F5' }}>
              <div className="ps-5">
                <PicturesWall setImages={setImages} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Row className=" p-4" style={{ backgroundColor: "#FFFFFF" }}>
                <Col md={4} sm={6} className="offset-sm-1 mt-4">
                    <h5 style={{ paddingTop: "40px" }}>
                        <b>Instructor Information</b>
                    </h5>
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">
                                Name
                            </label>
                            <input type="text" class="form-control" id="name" />
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">
                                Phone
                            </label>
                            <input type="text" class="form-control" id="phone" />
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">
                                Email
                            </label>
                            <input type="text" class="form-control" id="email" />
                        </div>
                        <div class="mb-3">
                            <label for="country" class="form-label">
                                Country
                            </label>
                            <select className="form-control form-select" id="country">
                                <option value="" selected>
                                    Please select a country
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">
                                City
                            </label>
                            <select className="form-control form-select" id="city">
                                <option value="" selected>
                                    Please select a city
                                </option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">
                                Password
                            </label>
                            <input type="text" class="form-control" id="password" />
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">
                                Address
                            </label>
                            <input type="text" class="form-control" id="address" />
                        </div>
                        <div class="mb-3">
                            <label for="notes" class="form-label">
                                Private Notes
                            </label>
                            <textarea class="form-control" id="notes" />
                        </div>

                        <button type="submit" class="btn" style={{ color: "white", backgroundColor: "rgb(161, 30, 30)" }}>
                            Add
                        </button>
                    </form>
                </Col>
            </Row> */}
    </>
  )
}

export default NewInstructor
