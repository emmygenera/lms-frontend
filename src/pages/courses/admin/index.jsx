import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './admincourses.scss'
import Card from './Card.jsx'
import { Spin, Menu, Select } from 'antd'

import { ProtectedRoute } from '../../../components'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import qs from 'query-string'
import Courses from '../../../services/courses'
import { toast } from 'react-toastify'

const AdminCourses = ({ history, location }) => {
  const [all, setAll] = React.useState(false)
  const [instructor, setInstructor] = useState(null)
  const [courses, setCourses] = useState([])

  const params = qs.parse(location.search, { ignoreQueryPrefix: true })
  const [data, setDate] = useState([])
  const [page, setPage] = useState(params.page || 1)
  const [pageSize, setPageSize] = useState(params.pageSize || 5)
  const [search, setSearch] = useState(params.search || '')
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(null)
  const [rating, setRating] = useState(null)
  const [current, setCurrent] = useState()

  const All = () => setAll(!all)

  const { categories, instructors } = useSelector((state) => state.general)

  useEffect(() => {
    setLoading(true)
    history.push(`?page=${page}&pageSize=${pageSize}&search=${search}`)
    Courses.getPaginated({ page, pageSize, query: search, instructor, category, rating })
      .then(({ data: { data: courses } }) => {
        setCourses(courses)
      })
      .finally(() => setLoading(false))
  }, [page, pageSize, instructor, category, rating, search])

  const deleteCourse = async (id) => {
    setCourses((_data) => {
      const newData = [...courses.filter(({ _id }) => _id !== id)]
      return newData
    })
    toast.success('Successfully deleted')
    return await Courses.deleteOne(id)
  }

  // const handleSearch = () => history.push(`?page=${page}&pageSize=${pageSize}&search=${search}`)

  return (
    <>
      <nav class="  navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home <span style={{ marginLeft: '10px' }}>/</span>
          </Link>
          {/* {loading && <Spin style={{ position: "absolute", top: '50%' }} />} */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  Courses <span style={{ marginLeft: '10px' }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  View Courses
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <nav>
                <ul id="navul">
                    <li>
                        <Link to="" className="navlink">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="navlink">
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="navlink">
                            View Courses
                        </Link>
                    </li>
                </ul>
            </nav> */}
      <h5 className="fw-bold  mt-0">Courses List</h5>

      <Row className="mb-5">
        <Col xs={5}>
          <div class="addmycourse1 input-group mb-3">
            <input type="text" class="form-control" placeholder="input search text" aria-label="Recipient's username" aria-describedby="button-addon2" value={search} onChange={({ target: { value } }) => setSearch(value)} />
            {/* <button class="btn btn-success" type="button" id="button-addon2" onClick={handleSearch}>
                            Search
                        </button> */}
          </div>
        </Col>

        <Col xs={3} className="offset-4">
          <Row>
            <Col xs={2}></Col>
            <Col xs={10}>
              <Link className="" to="newCourse">
                <p className="addmycourse " style={{ backgroundColor: '#F1F1F1' }}>
                  +Add New Course
                </p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="p-2 mb-2" style={{ backgroundColor: '#FFFFFF' }}>
        <div>
          <div className="d-flex flex-wrap mt-2 " style={{ width: '80%', marginLeft: '10px' }}>
            Category :
            <button className="categorylink" style={{ border: 'none', backgroundColor: 'transparent' }} onClick={All}>
              All
            </button>
            <Menu onClick={(e) => setCategory(e.key)} selectedKeys={[category]} mode="horizontal">
              {categories.slice(0, all ? categories.length : 5).map(({ name, _id }) => (
                <Menu.Item key={_id} className="categorylink">
                  {name}
                </Menu.Item>
              ))}
            </Menu>
            {/* {categories.slice(0, all ? categories.length : 5).map(({ name, _id }) => <div key={_id} className="categorylink" onClick={() => setCategory(_id)}>{name}</div>)} */}
          </div>
          <div id="divdrop" className="dropdown float-end">
            <button id="btndrop" class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Expand
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item" href="#">
                Another action
              </a>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
        </div>
        <div className="" style={{ marginLeft: '10px' }}>
          Filter By instructor:
          <Select style={{ width: '10%' }} value={instructor} onChange={(e) => setInstructor(e)}>
            {instructors.map(({ name, _id }) => (
              <Select.Option value={_id}>{name}</Select.Option>
            ))}
          </Select>
          Rating:
          <Select
            style={{ width: '10%' }}
            // className="ms-2 me-3"
            onChange={(e) => setRating(e)}
            value={rating}
          >
            {[...Array(5)].map((item, i) => (
              <Select.Option value={i + 1}>{i + 1}</Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="mt-5" style={{ backgroundColor: 'white' }}>
        <Row>
          {!loading && courses.map((course) => <Card deleteCourse={deleteCourse} course={course} key={JSON.stringify(course)} />)}
          {loading && <Spin />}
          {/* <Card /> */}
          {/* <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card /> */}
        </Row>
      </div>
    </>
  )
}

export default AdminCourses
