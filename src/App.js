import React, { useState, useEffect, useRef, Fragment } from 'react'
import classNames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import { AppTopbar } from './AppTopbar'
import { AppFooter } from './AppFooter'
import { AppMenu, FooterSection } from './AppMenu'
import { AppProfile } from './AppProfile'

import { Router, menu } from './routing'

import PrimeReact from 'primereact/api'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'prismjs/themes/prism-coy.css'
import './layout/flags/flags.css'
import './layout/layout.scss'
import './App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setHeading } from './redux/actions/menu'
import useSelection from 'antd/lib/table/hooks/useSelection'
import Category from './services/category'
import { setCategories, setCourses, setInstructors, setOrders } from './redux/actions/generalActions'
import Instructor from './services/instructor'
import Courses from './services/courses'
import orderService from './services/orders'

const App = () => {
  const [layoutMode, setLayoutMode] = useState('static')
  const [layoutColorMode, setLayoutColorMode] = useState('dark')
  const [inputStyle, setInputStyle] = useState('outlined')
  const [ripple, setRipple] = useState(false)
  const [sidebarActive, setSidebarActive] = useState(true)
  const sidebar = useRef()

  const history = useHistory()

  let menuClick = false

  useEffect(() => {
    if (sidebarActive) {
      addClass(document.body, 'body-overflow-hidden')
    } else {
      removeClass(document.body, 'body-overflow-hidden')
    }
  }, [sidebarActive])

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle)
  }

  const onRipple = (e) => {
    PrimeReact.ripple = e.value
    setRipple(e.value)
  }

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode)
  }

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode)
  }

  const onWrapperClick = (event) => {
    if (!menuClick && layoutMode === 'overlay') {
      setSidebarActive(false)
    }
    menuClick = false
  }

  const onToggleMenu = (event) => {
    menuClick = true

    setSidebarActive((prevState) => !prevState)

    event.preventDefault()
  }

  const onSidebarClick = () => {
    menuClick = true
  }

  const onMenuItemClick = (event) => {
    if (!event.item.items && layoutMode === 'overlay') {
      setSidebarActive(false)
    }
  }

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className)
    else element.className += ' ' + className
  }

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className)
    else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }

  const isSidebarVisible = () => {
    return sidebarActive
  }

  const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg'

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-active': sidebarActive,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': ripple === false,
  })

  const sidebarClassName = classNames('layout-sidebar', {
    'layout-sidebar-dark': layoutColorMode === 'dark',
    'layout-sidebar-light': layoutColorMode === 'light',
  })

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setHeading(
        capitalizeFirstLetter(
          location.pathname
            .replace(/([A-Z])/g, ',$1')
            .replace(',', ' ')
            .replace('/', '')
        )
      )
    )
  }, [location])

  const { logedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    if (logedIn) {
      Category.getAll().then(({ data: { data: categories } }) => {
        dispatch(setCategories(categories))
      })
      Instructor.getAll().then(({ data: { data: instructors } }) => {
        dispatch(setInstructors(instructors))
      })
      Courses.getAll().then(({ data: { data: courses } }) => {
        dispatch(setCourses(courses))
      })
      orderService.getAll().then(({ data: { data: orders } }) => {
        //console.log({ orders })
        dispatch(setOrders(orders))
      })
    }
  }, [])

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      {logedIn && (
        <Fragment>
          <AppTopbar onToggleMenu={onToggleMenu} />
          <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
            <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
              <div className="layout-logo" style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>
                {/* <img alt="Logo" src={logo} /> */}
              </div>
              <AppProfile />
              <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
              <FooterSection />
            </div>
          </CSSTransition>
        </Fragment>
      )}

      <Router />
      {logedIn && <AppFooter />}
    </div>
  )
}

export default App
