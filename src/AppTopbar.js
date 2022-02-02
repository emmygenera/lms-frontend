import React from "react";
import { InputText } from "primereact/inputtext";
import { useSelector } from "react-redux";
import "./App.scss";

export const AppTopbar = (props) => {
    const { heading } = useSelector((state) => state.menu);
    return (
        <div className="layout-topbar clearfix" style={{ backgroundColor: "#ffffff", top: "0px", paddingTop: "20px", height: "70px" }}>
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                {/* <span className="pi pi-bars" /> */}
                <img src="/images/menu.png" style={{ marginTop: "-5px" }} />
            </button>

            <span style={{ marginLeft: "30px", marginRight: "100px", fontSize: "1.5em", color: "#000000" }}>
                <b>{heading}</b>
            </span>
            <span className="layout-topbar-search" style={{ position: "absolute", top: "20px", left: "300px" }}>
                <InputText type="text" placeholder="Search here" style={{ borderRadius: "2rem", width: "100%" }} />
                <span className="layout-topbar-search-icon pi pi-search" style={{ width: "23.99px", height: "24px", position: "absolute", right: "10px", top: "12px", color: "#A4A4A4" }} />
            </span>

            <div className="layout-topbar-icons" id="layout-icons" style={{ marginTop: "10px" }}>
                <button type="button" className="p-link">
                    {/* <span className="layout-topbar-item-text">Events</span>
                    <span className="layout-topbar-icon pi pi-calendar" />
                    <span className="layout-topbar-badge">5</span> */}
                    <img src="/images/notification@2x.png" width="40px" height="38px" />
                </button>
                <button type="button" className="p-link">
                    <img src="/images/chat.png" width="40px" height="38px" />
                </button>

                {/* <button type="button" className="p-link">
                    <img src="/images/Cart 2.png" id="bg-icon" width="20px" height="20px" style={{ backgroundColor: "#efefef", padding: "7px", width: "28px", borderRadius: "17px", height: "28px" }} />
                </button> */}
                <button type="button" className="p-link">
                    <img src="/images/profile.png" id="bg-icon" width="35px" height="38px" style={{ position: "absolute", top: "-20px" }} />
                </button>
            </div>
        </div>
    );
};
