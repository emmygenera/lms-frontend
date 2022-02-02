import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './new.scss'
import { Col, Row } from 'react-bootstrap'
import Category from '../../services/category'
// import Category from "../http";

import qs from 'query-string'

const NewCategory = ({ history, location }) => {
  const [CatList, setCatList] = useState([])

  const params = qs.parse(location.search)
  // console.log(params, location.search)
  const { name, parent, id } = params || {}

  const getCategory = async () => {
    try {
      const {
        data: { data },
      } = await Category.getAll()

      setCatList(data)
    } catch (err) {}
  }

  const [category, setCategory] = React.useState({
    name: name || '',
    parent: parent || '',
    id: id || '',
  })

  const addNew = () => {
    if (!id) {
      Category.add(category).then(() => {})
    } else {
      Category.updateOne(category).then((result) => {})
    }

    history.push('/categories')
  }
  React.useEffect(() => {
    getCategory()
  }, [])
  // console.log(category)

  return (
    <>
      <nav class="ps-3  navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home<span style={{ marginLeft: '10px' }}>/</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  Courses<span style={{ marginLeft: '10px' }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  New Category
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h5 className="mb-3 mt-0 ps-3">
        <b>Add New Category</b>
      </h5>

      <div className="shadow-sm p-3 row mt-md-5">
        <div className=" col-md-7 mt-5">
          <h5 className="offset-sm-2 mt-">
            <b>Category Information</b>
          </h5>

          <div className="row mb-2 mt-5">
            <p className="col-sm-3 text-sm-end">Name</p>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control myinput"
                value={category.name}
                onChange={(e) => {
                  setCategory({ ...category, name: e.target.value })
                }}
              />
            </div>
          </div>

          <div className="row mb-2 mt-5">
            <p className=" col-sm-3 text-sm-end">Parent</p>
            <div className="col-sm-7">
              <select
                defaultValue={category.parent}
                className="form-control form-select myinput"
                value={category.parent}
                onChange={(e) => {
                  if (e.target.value) setCategory({ ...category, parent: e.target.value })
                }}
              >
                <option value={null}>Please select a Parent</option>
                {CatList.map(({ name, _id, parent }, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-2 col-md-1 offset-sm-3  offset-md-3">
              <button id="btnupdate" onClick={addNew}>
                {category.parent ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewCategory
