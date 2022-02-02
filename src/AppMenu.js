import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { course, orders, setting, help, logout, customer, staf, instructor, invoice, ticket, messages, question, lead, markeet, tips, reports } from "./static/menuIcons";

const AppSubmenu = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

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
    let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;
    const index = item.label === "instructors" || item.label === "Courses" ? { width: "45px", height: "45px", marginRight: "3px" } : { width: "33px", height: "33px", marginRight: "10px" };
    const label = capitalizeFirstLetter(item.label);

    return (
      <React.Fragment>
        {item.label === "Dashboard" ? (
          <React.Fragment>
            <div className="superdasboard">
              <span className="dot">
                <div style={{ width: "33px", height: "33px" }} className="dashboardimagelogo">
                  <img src={"/images/ic_dashboard.png"} style={{ width: "100%", height: "100%" }} width={"33px"} height="33px" />
                </div>
              </span>
              <span className="dashboardHeading">{label}</span>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={index} className="">
              {item.iconType ? <img src={item.icon} style={{ width: "100%", height: "100%", display: "flex", justifyContent: "flex-start" }} /> : <i className={item.icon} />}
            </div>
            <span style={{ width: "100%" }}>{label}</span>
            {submenuIcon}
            {badge}
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

  let items =
    props.items &&
    props.items.map((item, i) => {
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

export const AppMenu = (props) => (
  <div className="layout-menu-container">
    <AppSubmenu items={props.model} className="layout-menu" onMenuItemClick={props.onMenuItemClick} root={true} />
  </div>
);

export const FooterSection = () => (
  <div className="manu-bottom-container">
    {bottomActions.map(({ label, icon, action }) => _menu({ label, icon, action }))}
    <div className="info-sidebar">
      <p className="p1">Ezeetrader</p>
      <p className="p2">© 2021 All Rights Reserved</p>
      <p className="p3">Made with ♥ by Chable Soft</p>
    </div>
  </div>
);
const _menu = ({ label, icon, action }) => {
  const index = label === "instructors" || label === "Courses" ? { width: "45px", height: "45px", marginRight: "3px" } : { width: "33px", height: "33px", marginRight: "10px" };
  return (
    <div className="_menu_item" onClick={() => {
      if (action) action()
    }}>
      <img src={icon} style={{ width: "24px", height: "24px", display: "flex", justifyContent: "flex-start" }} />
      <span style={{ marginLeft: "14px" }}>{label}</span>
    </div>
  );
};

const bottomActions = [
  {
    label: "Settings",
    icon: setting,
    iconType: "image",
    items: [{ label: "View Reports", to: "/" }],
  },
  {
    label: "Help",
    icon: help,
    iconType: "image",
    items: [{ label: "View Reports", to: "/" }],
  },
  {
    label: "Logout",
    icon: logout,
    iconType: "image",
    action: () => {
      localStorage.clear();
      window.location = "/"
    }
  },
];

//