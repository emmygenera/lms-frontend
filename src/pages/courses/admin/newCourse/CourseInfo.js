import React, { useState } from 'react'
import Package from './Package'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UploadService from '../../../../services/uploadService'
import { toast } from 'react-toastify'
import { Form, Input, Select } from 'antd'

const CourseInfo = ({ handleChange, initVals }) => {
  const { categories, instructors } = useSelector((state) => state.general)
  const [base64file, setbase64file] = useState('')
  const uploadFile = async ({ target: { files } }) => {
    // const form = new FormData()
    // form.append('image', target.files[0])
    // const {
    //   data: { url },
    // } = await UploadService.uploadToServer(form)
    // handleChange({ image: url })
    // toast.success('image uploaded')

    const result = await ImageToBase64(files[0]).catch((e) => Error(e))
    if (result instanceof Error) {
      console.error('Error: ', result.message)
      return
    }
    handleChange({ file: result })
    //setbase64file(result);
  }
  const ImageToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  return (
    <Row className="">
      <Col md={5} className="">
        <h5>
          <b>Course information</b>
        </h5>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Category" name="cateId" /*name="category"*/ rules={[{ required: true }]}>
          <Select defaultValue={'Please select a Category'}>
            {categories?.map((course, index) => (
              <Select.Option key={index} value={course._id}>
                {course.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Instructor" name={'instId'} /*name="instructor"*/ rules={[{ required: true }]}>
          <Select defaultValue={'Please select a Instructor'}>
            {instructors?.map((course, index) => (
              <Select.Option key={index} value={course._id}>
                {course.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Row className="align-items-center">
          <Col md={3} xs={4} className="text-sm-end">
            <p>Cover image</p>
          </Col>
          <Col md={9} xs={8} className="">
            <input class="form-control" type="file" accept="image/*" multiple={false} onChange={file => uploadFile(file)} />
          </Col>
        </Row> */}
        <Form.Item label="Cover image">
          <input class="form-control" type="file" accept="image/*" multiple={false} onChange={(file) => uploadFile(file)} />
          {/* <Input type="file" class="form-control" type="file" accept="image/*" multiple={false} onChange={file => uploadFile(file)} /> */}
          {/* <input class="form-control" type="file" accept="image/*" multiple={false} onChange={file => uploadFile(file)} /> */}
        </Form.Item>
        <Form.Item label="Course Status" name="courseStatus" rules={[{ required: true }]}>
          <Select defaultValue={'Please select status'}>
            <Select.Option value="1">Active</Select.Option>
            <Select.Option value="0">Disabled</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Package handleChange={handleChange} initVals={initVals} />
    </Row>
  )
}

export default CourseInfo
