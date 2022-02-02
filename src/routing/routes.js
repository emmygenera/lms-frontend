import React from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import { IndexRoutes } from "./index";
import { Login } from "../pages";
import { useSelector } from "react-redux";

const Router = () => {
    const location = useLocation();

    const { logedIn } = useSelector((state) => state.auth);

    if (Boolean(logedIn))
        return (
            <div className="layout-main">
                {/* <div className="container-fluid"> */}
                {IndexRoutes.map(({ path, component }, index) => (
                    <Route path={`/${path}`} component={component} key={`${index}--${path}`} exact={true} />
                ))}
                {/* </div> */}
            </div>
        );

    return (
        <div className="container-fluid">
            <Login />
        </div>
    );
};

export default Router;
