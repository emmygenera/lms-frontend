import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Popconfirm, Table } from 'antd'
import { toast } from 'react-toastify'
import _ from 'lodash'
import qs from 'query-string'
import moment from 'moment'
import { Input } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'

import { CustomPagination, Actions } from '../../components'

import InstructorService from '../../services/instructor'

import './index.scss'
import PaginatedTable from '../../components/PaginatedTable'

const Instructor = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true })
  const [data, setDate] = useState([])
  const [page, setPage] = useState(params.page || 1)
  const [pageSize, setPageSize] = useState(params.pageSize || 5)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [dateFilters, setDateFilters] = useState([])
  const [nameFilters, setNameFilters] = useState([])
  const [statusFilters, setStatusFilters] = useState([])
  const [phoneFilters, setPhoneFilters] = useState([])
  const [search, setSearch] = useState(params.query || '')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    getData()
  }, [page, pageSize])

  useEffect(() => {
    getData()
    setPage(1)
  }, [search])

  const getData = () => {
    setLoading(true)
    props.history.push(`?page=${page}&pageSize=${pageSize}&query=${search}`)
    InstructorService.getPaginated(page, pageSize, search || '')
      .then(({ data: { data: instructors, total = 0 } }) => {
        if (instructors.length === 0 && page > 1) return setPage(page - 1)
        setTotal(total)
        setDate(instructors.map((category, index) => ({ ...category, action: actions(category), id: index + 1, index: index + 1, join_date: moment(category.createdAt).format('L') })))
        setDateFilters(instructors.map(({ createdAt }) => ({ value: moment(createdAt).format('L'), text: moment(createdAt).format('L') })))
        setNameFilters(instructors.map(({ name }) => ({ value: name, text: name })))
        setStatusFilters(instructors.map(({ status }) => ({ value: status, text: status })))
        setPhoneFilters(instructors.map(({ phone }) => ({ value: phone, text: phone })))
      })
      .finally(() => setLoading(false))
  }

  const deleteCat = async (id) => {
    setDate((_data) => {
      const newData = [..._data.filter(({ _id }) => _id !== id)]
      return newData
    })
    toast.success('Successfully deleted')
    return await InstructorService.deleteinstructor(id)
  }

  const updateCat = (data) => props.history.push(`/newInstructor?data=${JSON.stringify(data)}`)

  const actions = (category) => <Actions component={category} deleteFun={deleteCat} updateFun={updateCat} />

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },

    {
      title: 'Join Date',
      dataIndex: 'join_date',
      // filters: _.uniqBy(dateFilters, "value"),
      filters: [],
      filterSearch: true,
      onFilter: (value, record) => record.join_date.indexOf(value) === 0,
    },

    {
      title: 'Instructor Name',
      dataIndex: 'name',
      filters: _.uniqBy(nameFilters, 'value'),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.startsWith(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    // {
    //     title: "Inst. courses",
    //     dataIndex: "course",
    //     filters: [
    //         {
    //             text: "London",
    //             value: "London",
    //         },
    //         {
    //             text: "New York",
    //             value: "New York",
    //         },
    //     ],
    //     onFilter: (value, record) => record.course.indexOf(value) === 0,
    // },
    {
      title: 'Completion percentage',
      dataIndex: 'completion',
      sorter: (a, b) => a.age - b.age,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      filters: _.uniqBy(statusFilters, 'value'),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      filters: _.uniqBy(phoneFilters, 'value'),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ]

  // const data = [
  //     {
  //         key: "1",
  //         id: 1,
  //         join_date: 5,
  //         name: "John Brown",
  //         course: "The mern satck",

  //         status: "Active",
  //         phone: "123",
  //         action: <Actions />,
  //     },
  //     {
  //         key: "2",
  //         id: 2,
  //         join_date: 5,
  //         name: "Jim Green",
  //         course: "The mern satck",

  //         status: "Active",
  //         phone: "123",
  //         action: <Actions />,
  //     },
  //     {
  //         key: "3",
  //         id: 3,
  //         join_date: 5,
  //         name: "Joe Black",
  //         course: "The mern satck",

  //         status: "Active",
  //         phone: "123",
  //         action: <Actions />,
  //     },
  //     {
  //         key: "4",
  //         id: 4,
  //         join_date: 5,
  //         name: "Jim Red",
  //         course: "The mern satck",
  //         status: "Active",
  //         phone: "123",
  //         action: <Actions />,
  //     },
  // ];

  const deleteAll = () => {
    return new Promise((resolve, reject) =>
      Promise.all(selectedRowKeys.map(async (id) => await InstructorService.deleteinstructor(id))).then(() => {
        getData()
        resolve('')
        setSelectedRowKeys([])
      })
    )
  }

  // Testing
  const activeAll = () => {
    const rows = selectedRowKeys.map((id) => data.find(({ _id }) => _id == id)).map((item) => ({ id: item._id, status: 'Active' }))
    setLoading(true)
    Promise.all(rows.map(async (instructor) => await InstructorService.updateOne(instructor))).then(() => {
      toast.success('Activated successfully')
      getData()
      setSelectedRowKeys([])
    })
  }

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: '50px' }}>
        <Col sm={3}>
          <Link className="d-inline-flex ilinkbtn" to="/newInstructor" style={{ backgroundColor: '#F1F1F1' }}>
            <p className=" px-sm-2 py-md-2 px-md-4">+New Instructor</p>
          </Link>
        </Col>
        <Col sm={9} className="shadow-sm col2" style={{ borderRadius: '1em' }}>
          <Row className="py-md-2">
            <Col sm={12} md={6} lg={4} className="hidediv" style={{ position: 'relative' }}>
              {/* <i className="bi bi-person searchicon"></i>
                            <input style={{ height: "56px" }} id="isearchinput" type="search" placeholder="Search here"  />
                            <i className="bi bi-search" id="sicon"></i> */}
              <Input id={''} style={{ borderRadius: '20px' }} size="large" placeholder="Search here" prefix={<UserOutlined />} suffix={<SearchOutlined />} value={search} onChange={(e) => setSearch(e.target.value)} />
            </Col>
            <Col sm={12} md={6} lg={8}>
              <Popconfirm title="Confirm Delete" onConfirm={deleteAll}>
                <button id="ibtndelete" style={{ float: 'right' }} disabled={selectedRowKeys.length === 0}>
                  Delete
                </button>
              </Popconfirm>
              {/* :TODO: */}
              <button id="ibtnedit" style={{ float: 'right' }} disabled={selectedRowKeys.length !== 1}>
                Edit
              </button>

              <button id="ibtnactive" style={{ float: 'right' }} disabled={selectedRowKeys.length === 0} onClick={activeAll}>
                <h6 id="cicon" style={{ display: 'inline', marginRight: '2px' }}>
                  <i className="bi bi-check2-square" style={{ color: 'green' }}></i>
                </h6>
                Active
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4" style={{ backgroundColor: 'white' }}>
        <PaginatedTable total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} columns={columns} loading={loading} data={data} setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} />
      </div>
    </>
  )
}

export default Instructor
