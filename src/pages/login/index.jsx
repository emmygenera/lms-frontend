import React, { useState } from 'react'
import './login.scss'
import logo from './logo.png'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import User from '../../services/user'
import { useDispatch } from 'react-redux'
import { setUser as _setUser } from '../../redux/actions/auth'
import { toast } from 'react-toastify'

//login
const Login = () => {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user.email || !user.password) {
      return toast.error('Email or password is missing', { position: 'bottom-right' })
      //   return alert('Email or password is missing')
    }
    setLoading(true)

    User.login(user.email, user.password)
      .then(({ data }) => {
        dispatch(_setUser(data))
        // redux mae user set krna hai and token localstorage mae set or wo redux
      })
      .finally(() => setLoading(false))
  }

  return (
    <Row style={{ height: '100vh' }}>
      <Col sm={12} md={6} className="leftdiv" style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div className="ms-1 ps-1 ms-md-5 ps-md-5 mt-5">
          <img className="img-fluid leftdivlogo" src={logo} alt="logo" />
          <p id="leftdivpara1">Ezeetrader</p>
          <p id="leftdivpara2">Welcome to Ezeetrader Jordan</p>
          <button className="btn btn-sm btn-outline-secondary" id="leftdivbtn">
            SHOP NOW
          </button>
        </div>
        {/* <div style={{ position: "absolute", bottom: 0, left: 0, height: "300px", width: "300px" }}>
                    <img src="/images/login-bottom.png" height="300px" width="300px" />
                </div> */}
      </Col>
      <Col md={6} sm={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
        <div className="mt-md-5 mb-3">
          <p className="pt-5" id="righttdivpara1">
            Hello Again!
          </p>
          <p className="" style={{ fontSize: '0.8em' }}>
            Welcome back
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="Email Address"
              name="email"
              style={{ borderRadius: '1em' }}
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value })
              }}
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              name="password"
              style={{ borderRadius: '1em' }}
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value })
              }}
            />
          </div>

          <div class="mb-1">
            <button id="rightdivbtn" disable={loading} class="form-control btn btn-info btn-outline-success">
              {loading ? 'Sending Request' : 'Login'}
            </button>
          </div>
          <div class="text-end">
            <Link to="#" id="rightdivanchor">
              Forgot Password
            </Link>
          </div>
        </form>
      </Col>
    </Row>
  )
}

export default Login
