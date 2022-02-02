import React from "react";
import "./App.scss";

export const AppFooter = () => {
    return (
        <div className="layout-footer" id="app-footer">
            <span className="footer-text" style={{ marginRight: "5px" }}>
                EzeeTrader
            </span>
            <img src="assets/demo/images/logo.png" alt="Logo" width="80" />
            <span className="footer-text" style={{ marginLeft: "5px" }}>
                Leraning material
            </span>
        </div>
    );
};
