import React from "react";
import { Route, useHistory, useLocation, Redirect } from "react-router-dom";
import { IndexRoutes } from "./index";
// import { Login } from "../pages";
import { useSelector } from "react-redux";
import perm from "../services/perm.json";
import { PublicRoutes } from "./indexRoutes";

const Router = () => {
  const location = useLocation();

  /*
  Staffs can login and work on backend with access by role

Financial can edit orders and invoices but cant edit anything else

Staff can edit everything but cant delete anything.

Manager can edit everything but cant add or edit users.

Admin has access to everything

Marketing can only send newsletter and add leads

  */
  const { logedIn, userRl, userRlId } = useSelector((state) => state.auth);

  // console.log(userRl);
  // 'admin';
  if (Boolean(logedIn) && perm[userRl]) {
    //
    // console.log(logedIn, userRl);

    // const user_perm = perm[userRl];
    // let found=0
    // staff@ezeetrader.com
    return (
      <div className="layout-main">
        {/* <div className="container-fluid"> */}
        {IndexRoutes.map(({ path, perm: uperm, component }, index) => {
          // console.log(uperm.includes(userRl), uperm);
          if (uperm.includes(userRl)) return <Route path={`/${path}`} component={component} key={`${index}--${path}`} exact={true} />;
          // else return <Route path={`/to404`} component={PageNotFound} key={`${index}--ssds`} exact={true} />;
        })}
        {/* </div> */}
      </div>
    );
  } else
    return PublicRoutes.map(({ path, component }, index) => {
      return (
        // <div className="container-fluid">
        <Route path={`/${path}`} component={component} key={`${index}--${path}`} exact={true} />
        // </div>
      );
    });

  // return (
  //
  //     <Login />
  //
  // );
};

export default Router;
