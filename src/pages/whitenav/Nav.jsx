import React from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { object_entries } from "../../applocal";
import { setSearchString } from "../../redux/actions/generalActions";
// import { notification, chat, menu } from "../../static/menuIcons";
import "./whitenav.scss";

export const Nav = () => {
  const { carts } = useSelector((s) => s.globals);
  const dispatch = useDispatch();
  const len = object_entries(carts).length > 0;

  return (
    <>
      <nav class="navbar navbar-dark bg-dark justify-content-between">
        <div className="container">
          <div className="col-sm-5 p-0">
            <div className="p-relative resize-150 ">
              <div className="p-absolute w-150 m-0 ">
                <Link class="navbar-brand" to="/">
                  <img src="logo.png" className="w-100" alt="site logo" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-7 p-0">
            <div className="d-flex justify-content-end align-items-center">
              <div className="w-100 pr-sm-2">
                <form class="form-inline resize-350 m-auto mr-0 d-flex p-relative">
                  <input class="form-control w-100 mr-sm-2 px-4 p-2 rad_10 text-white" type="search" onChange={({ target: { value } }) => dispatch(setSearchString(value))} placeholder="Search here" style={{ backgroundColor: "transparent" }} />
                  <button class="btn bg-transparent p-absolute pr-3 rad_10 p-right-0 p-top-0 my-,2 my,-sm-0" type="submit" style={{ backgroundColor: "transparent" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                        fill="#A4A4A4"
                      />
                    </svg>
                  </button>
                </form>
              </div>
              <div className="pl-3">
                <Link
                  to="create-user-order"
                  onClick={(e) => {
                    if (!len) {
                      e.preventDefault();
                      return false;
                    }
                  }}
                >
                  <svg width="56" height="52" viewBox="0 0 66 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="6" width="56" height="56" rx="28" fill="#EFEFEF" />
                    {len && <circle cx="53" cy="13" r="11.5" fill="#FF2626" stroke="white" stroke-width="3" />}
                    <ellipse cx="25.2634" cy="43.1804" rx="1.81955" ry="1.81955" fill="#219653" />
                    <ellipse cx="31.3283" cy="43.1804" rx="1.81955" ry="1.81955" fill="#219653" />
                    <path
                      d="M17.0479 24.0476C18.8914 24.9694 19.8047 25.7752 19.8047 28.0175M19.8047 28.0175C19.8047 37.1153 22.2308 38.9348 28.296 38.9348C34.3611 38.9348 36.7872 37.1153 36.7872 29.8371C36.7872 28.8156 36.1807 28.0175 34.9677 28.0175C33.7546 28.0175 23.8452 28.0175 19.8047 28.0175Z"
                      stroke="#219653"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
//    {/* <Row className="justify-content-center ">
//         <Col lg={4} className="">
//           {/* <h1>
//             <i className="bi bi-list mr-4"></i>Dashboard
//           </h1> */}
//         </Col>
//         <Col lg={4} className="">
//           <form className="d-flex  align-items-center">
//             <input className="form-control " type="search" placeholder="Search" aria-label="Search" />
//             <button className="btn btn-outline-success" type="submit">
//               Search
//             </button>
//           </form>
//         </Col>
//         <Col lg={4} className="">
//           {/* <img src={notification} className="img-fluid" alt="" />
//                     <img src={chat} className="img-fluid" alt="" />
//                     <img src={menu} className="img-fluid" alt="" /> */}
//         </Col>
//       </Row> */}
