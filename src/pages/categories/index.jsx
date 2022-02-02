import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'
import qs from 'query-string'

import './categories.scss'

import { Table } from 'antd'
import { CustomPagination, Actions } from '../../components'
import Category from '../../services/category'
import { toast } from 'react-toastify'

const Categories = (props) => {
  // :TODO: REDUX

  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true })
  const [data, setDate] = useState([])
  const [page, setPage] = useState(params.page || 1)
  const [pageSize, setPageSize] = useState(params.pageSize || 5)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const [nameFilters, setNameFilters] = useState([])
  const [parenteFilters, setParentFilters] = useState([])

  const deleteCat = async (id) => {
    setDate((_data) => {
      const newData = [..._data.filter(({ _id }) => _id !== id)]
      return newData
    })
    toast.success('Successfully deleted')
    return await Category.deleteCategory(id)
  }

  const updateCat = ({ name, _id: id, parent }) => props.history.push(`/newCategory?id=${id}&parent=${parent}&name=${name}`)

  const actions = (category) => <Actions component={category} deleteFun={deleteCat} updateFun={updateCat} />

  useEffect(() => {
    setLoading(true)
    props.history.push(`?page=${page}&pageSize=${pageSize}`)
    Category.getPaginated(page, pageSize)
      .then(({ data: { data: categories } }) => {
        // .then(({ data: { categories, total } }) => {
        const total = categories.length
        setTotal(total)
        setDate(categories.map((category, index) => ({ ...category, index: index + 1, actions: actions(category), date: moment(category.createdAt).format('L') })))
        setNameFilters(categories.map(({ name }) => ({ value: name, text: name })))
        setParentFilters(categories.map(({ parent }) => ({ value: parent, text: parent })))
      })
      .finally(() => setLoading(false))
  }, [page, pageSize])

  const columns = [
    {
      title: 'Cat ID',
      dataIndex: 'index',
      width: '30%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      filters: nameFilters,
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
      filters: parenteFilters,
      onFilter: (value, record) => record.parent.startsWith(value),
      filterSearch: true,
      width: '40%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
    },
  ]

  return (
    <>
      <nav id="catnav" class="mt-4 ps-4  navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home <span style={{ marginLeft: '10px' }}>/</span>
          </Link>
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
                  View Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h5 classclassName="ms-5 mb-8" style={{ marginTop: '-6px' }}>
        <b className="">Course Category List</b>
      </h5>
      <Row className=" mt-3 mb-2 mt-6">
        <Col sm={3}>
          <Link className="d-inline-flex linkbtn" to="newCategory" style={{ backgroundColor: '#F1F1F1' }}>
            <i class="ps-2 bi bi-stack"></i>
            <p className="ps-2">Add New Category</p>
          </Link>
        </Col>
        <Col sm={8}></Col>
      </Row>

      <Row>
        <Col md={6} style={{ backgroundColor: 'FFFFFF' }}>
          <Table className="mb-4" columns={columns} dataSource={data} pagination={false} loading={loading} />
          <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
        </Col>
      </Row>
    </>
  )
}

export default Categories
