import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { course, orders, setting, help, logout, customer, staf, instructor, invoice, ticket, messages, question, lead, markeet, tips, reports } from "./static/menuIcons";
import { baseUrl } from "./applocal";
import { useSelector } from "react-redux";
import { pmac } from "./routing/indexRoutes";
import APP_USER from "./services/APP_USER";
import NotifcationAPI from "./services/NotificationAPI";

const AppSubmenu = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);
  // const [NotifcationData, setNotifcationData] = useState({ courseNotifcations: [], messageNotifications: [], ticketNotifications: [], questionNotifications: [], orderNotifications: [] });
  const { userRl, user } = useSelector((s) => s.auth);
  const { notifications: NotifcationData } = useSelector((s) => s.general);

  const onMenuItemClick = (event, item, index) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (index === activeIndex) setActiveIndex(null);
    else setActiveIndex(index);

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderLinkContent = (item) => {
    let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
    const badge = (count = 0) =>
      count > 0 && (
        <span className="menuitem-badge" style={{ backgroundColor: "#BC1819" }}>
          {count}
        </span>
      );
    // let badge = item.badge && (
    //   <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <circle cx="11.5" cy="11.5" r="11.5" fill="#BC1819" />
    //     <path
    //       d="M8.54 15.88H14.468V14.488H10.928C12.32 13.312 14.276 11.728 14.276 9.7C14.276 8.176 13.328 7.06 11.444 7.06C9.872 7.06 8.588 7.984 8.528 9.988H10.16C10.172 9.064 10.616 8.488 11.42 8.488C12.248 8.488 12.596 9.016 12.596 9.796C12.596 11.404 10.52 12.952 8.54 14.632V15.88Z"
    //       fill="white"
    //     />
    //     1
    //   </svg>
    // );

    const index = item.label === "instructors" || item.label === "Courses" ? { width: "45px", height: "45px", marginRight: "3px" } : { width: "33px", height: "33px", marginRight: "10px" };
    const label = capitalizeFirstLetter(item.label);

    return (
      <React.Fragment>
        {item.label === "Dashboard" ? (
          <React.Fragment>
            <div className="superdasboard">
              <span className="dot">
                <div style={{ width: "33px", height: "33px" }} className="dashboardimagelogo">
                  <img src={baseUrl("images/ic_dashboard.png")} style={{ width: "100%", height: "100%" }} width={"33px"} height="33px" />
                  {/* <img src={"/images/ic_dashboard.png"} style={{ width: "100%", height: "100%" }} width={"33px"} height="33px" /> */}
                </div>
              </span>
              <span className="dashboardHeading">{label}</span>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={index} className="">
              {item.iconType == "image" ? <img src={item.icon} style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start" }} /> : "html" ? item.icon : <i className={item.icon} />}
            </div>
            <span style={{ width: "100%" }}>
              {label} {badge(NotifcationData[item.badge]?.length)}
            </span>
            {submenuIcon}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  const renderLink = (item, i) => {
    let content = renderLinkContent(item);

    if (item.to) {
      return (
        <NavLink activeClassName="active-route" to={item.to} onClick={(e) => onMenuItemClick(e, item, i)} exact target={item.target}>
          {content}
        </NavLink>
      );
    } else {
      return (
        <a href={item.url} onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
          {content}
        </a>
      );
    }
  };

  // console.log({ userRl });
  let items =
    props.items &&
    props.items.map((item, i) => {
      // console.log({ item });
      // perm: pmac(["admin", "manager", "marketing"]);
      // console.log(item.perm, userRl);
      if (item.perm && !item.perm?.includes(userRl)) return null;

      let active = activeIndex === i;
      let styleClass = classNames(item.badgeStyleClass, { "active-menuitem": active && !item.to });

      return (
        <li className={styleClass} key={i}>
          {item.items && props.root === true && <div className="arrow"></div>}
          {renderLink(item, i)}
          <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
            <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
          </CSSTransition>
        </li>
      );
    });

  return items ? <ul className={props.className}>{items}</ul> : null;
};

{
  /* <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 11L11 -4.72849e-07L22 11" fill="#21B830" />
</svg>; */
}

export const AppMenu = (props) => (
  <div className="layout-menu-container">
    <AppSubmenu items={props.model} className="layout-menu" onMenuItemClick={props.onMenuItemClick} root={true} />
  </div>
);

export const FooterSection = () => {
  const { userRl } = useSelector((s) => s.auth);
  // perm: pmac(["admin", "manager", "marketing"]);
  // console.log(userRl);
  return (
    <div className="manu-bottom-container">
      {bottomActions.map(({ label, icon, action, perm, to }) => perm?.includes(userRl) && _menu({ label, icon, action, to }))}
      <div className="info-sidebar">
        <p className="p1">Ezeetrader</p>
        <p className="p2">© 2021 All Rights Reserved</p>
        <p className="p3">Made with ♥ by Chable Soft</p>
      </div>
    </div>
  );
};
const _menu = ({ label, icon, action, to }) => {
  const index = label === "instructors" || label === "Courses" ? { width: "45px", height: "45px", marginRight: "3px" } : { width: "33px", height: "33px", marginRight: "10px" };

  // console.log({ label, icon, action, to });

  if (to)
    return (
      <Link
        to={to}
        className="_menu_item"
        onClick={() => {
          if (action) action();
        }}
      >
        <img src={icon} style={{ width: "24px", height: "24px", display: "flex", justifyContent: "flex-start" }} />
        <span style={{ marginLeft: "14px" }}>{label}</span>
      </Link>
    );
  return (
    <div
      className="_menu_item"
      onClick={() => {
        if (action) action();
      }}
    >
      <img src={icon} style={{ width: "24px", height: "24px", display: "flex", justifyContent: "flex-start" }} />
      <span style={{ marginLeft: "14px" }}>{label}</span>
    </div>
  );
};

const bottomActions = [
  // {
  //   label: "Settings",
  //   icon: setting,
  //   perm: ["admin"],
  //   iconType: "image",
  //   to: "/settings",
  //   items: [{ label: "View Settings", to: "/settings" }],
  // },
  {
    label: "Help",
    perm: pmac([APP_USER.customer]),
    icon: help,
    to: "/tickets",
    iconType: "image",
    items: [{ label: "View Reports", to: "/" }],
  },
  {
    label: "Logout",
    icon: logout,
    perm: pmac(),
    iconType: "image",
    action: () => {
      localStorage.clear();

      // window.location = "/";
      //window.location.replace(baseUrl("#"));
      window.location.href = baseUrl();
    },
  },
];

//
