import React, { useState, useEffect, useRef, Fragment } from "react";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu, FooterSection } from "./AppMenu";
import { AppProfile } from "./AppProfile";

import { Router, menu } from "./routing";

import PrimeReact from "primereact/api";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";
import "./static/css/upload.css";
import "./static/css/custom.css";
import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "./redux/actions/menu";
import useSelection from "antd/lib/table/hooks/useSelection";
import Category from "./services/category";
import { setCategories, setCourses, setInstructors, setNotification, setOrders } from "./redux/actions/generalActions";
import Instructor from "./services/instructor";
import Courses from "./services/courses";
import orderService from "./services/orders";
import NotifcationAPI from "./services/NotificationAPI";
import APP_USER from "./services/APP_USER";
import GoogleAnalytics from "./components/GoogleAnalytics";
import settingsAPI from "./services/settingsAPI";
import { split, toCapitalize } from "./applocal";
import setConfirmCode from "./pages/functions/setConfirmCode";

const App = () => {
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(true);
  const [googleTagManagerId, setGoogleTagManagerId] = useState("");
  const [SiteData, setSiteData] = useState({});

  const sidebar = useRef();

  const history = useHistory();

  let menuClick = false;
  function getAppSettings() {
    // console.log("settingsAPI");
    settingsAPI.get().then(({ data: { data } }) => {
      // console.log({ data }, "settingsAPI");
      window.gtag("js", new Date());
      setSiteData(data);
      setConfirmCode(data?.delete_confirm_code);
      window.gtag("config", data?.google_analytics_code);
      setGoogleTagManagerId(data?.google_analytics_code);
    });
  }
  useEffect(() => {
    if (sidebarActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [sidebarActive]);

  useEffect(() => {
    getAppSettings();
  }, []);

  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode) => {
    setLayoutColorMode(mode);
  };

  const onWrapperClick = (event) => {
    if (!menuClick && layoutMode === "overlay") {
      setSidebarActive(false);
    }
    menuClick = false;
  };

  const onToggleMenu = (event) => {
    menuClick = true;

    setSidebarActive((prevState) => !prevState);

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items && layoutMode === "overlay") {
      setSidebarActive(false);
    }
  };

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
  };

  const isSidebarVisible = () => {
    return sidebarActive;
  };

  const logo = layoutColorMode === "dark" ? "assets/layout/images/logo-white.svg" : "assets/layout/images/logo.svg";

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-active": sidebarActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
  });

  const sidebarClassName = classNames("layout-sidebar", {
    "layout-sidebar-dark": layoutColorMode === "dark",
    "layout-sidebar-light": layoutColorMode === "light",
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { logedIn: logedInToDashboard, user, userRl } = useSelector((state) => state.auth);

  const location = useLocation();

  useEffect(() => {
    if (googleTagManagerId) {
      let pagePath = window.location.hash.split("/").pop();

      if (!pagePath) {
        pagePath = SiteData?.companyName + " | " + SiteData?.tagline;
      } else pagePath = pagePath.replace(/[A-Z]+/g, ($) => " " + $);

      document.title = pagePath.includes("viewCourse") ? pagePath : split(toCapitalize(pagePath), "?", 0);

      if (userRl == APP_USER.customer || !userRl) {
        window.gtag("set", "page_path", window.location.hash);
        window.gtag("set", "page_title", pagePath);
        window.gtag("event", "page_view");
        // window.gtag("send", "pageview");
      }
    }
  }, [window.location.hash, googleTagManagerId]);

  function getNotification() {
    const notf = userRl == APP_USER.customer ? NotifcationAPI.userNotifications : NotifcationAPI.adminNotifications;
    notf(user?.id).then(({ data: { data } }) => {
      dispatch(setNotification(data));
    });
  }
  const dispatch = useDispatch();

  useEffect(() => {
    getNotification();
  }, []);
  setInterval(getNotification, 60000 * 2);

  useEffect(() => {
    dispatch(
      setHeading(
        capitalizeFirstLetter(
          location.pathname
            .replace(/([A-Z])/g, ",$1")
            .replace(",", " ")
            .replace("/", "")
        )
      )
    );
  }, [location]);

  // console.log({ logedInToDashboard, user });

  useEffect(() => {
    if (logedInToDashboard) {
      Category.getAll().then(({ data: { data: categories } }) => {
        dispatch(setCategories(categories));
      });
      Instructor.getAll().then(({ data: { data: instructors } }) => {
        dispatch(setInstructors(instructors));
      });
      Courses.getAll().then(({ data: { data: courses } }) => {
        dispatch(setCourses(courses));
      });

      orderService.getAll().then(({ data: { data: orders } }) => {
        //console.log({ orders })
        dispatch(setOrders(orders));
      });
    }
  }, []);

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      {googleTagManagerId && <GoogleAnalytics googleTagManagerId={googleTagManagerId} />}
      {logedInToDashboard && (
        <Fragment>
          <AppTopbar onToggleMenu={onToggleMenu} />
          <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
            <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
              <div className="layout-logo" style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
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
      {logedInToDashboard && <AppFooter />}
    </div>
  );
};

export default App;
