import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingAnim from "../../../components/LoadingAnim";
import reportAPI from "../../../services/reportAPI";

import VProgressBar from "./VProgressBar";

export default function Stats({}) {
  const [loading, setloading] = useState(false);
  const [Data, setData] = useState({});

  function getReports() {
    setloading(true);
    reportAPI
      .getAll()
      .then(({ data: { data } }) => setData(data))
      .finally(() => setloading(false));
  }

  useEffect(() => {
    getReports();
  }, []);

  if (loading) {
    return <LoadingAnim />;
  }
  // console.log();
  const totalRevenue = Data?.revenue?.revenue,
    trending = Data?.course?.trending || [],
    totalUsers = Data?.user?.totalUsers,
    totalCourses = Data?.course?.courseCount,
    refundTicket = Data?.refund?.ticket,
    activeDailyUsers = Data?.user?.activeUsersDaily,
    activeMonthlyUsers = Data?.user?.activeUsersMonthly,
    totalCustomer = Data?.user?.monthly,
    userActivePercent = Math.ceil((activeDailyUsers / totalUsers) * 100);

  return (
    <div className="bg-white outline-shadow p-4 .mt-4">
      <div className="row">
        <div className="col-sm-6">
          <div className="font-weight-bold">
            <strong className="font-weight-bold fz-5 pr-1">{totalCourses}</strong>
            <strong>Total Courses</strong>
          </div>
          <div>
            <p>Courses sold today</p>
            <div className="p-3"></div>
            <div className="row p-relative">
              <div className="col-6 pl-0">
                <Link to="/report" className="py-2" style={{ textDecoration: "underline", color: "#2b9035" }}>
                  View more &rarr;
                </Link>
              </div>
              <div className="col-6 p-absolute p-right-0" style={{ bottom: 0 }}>
                <span className="d-flex justify-content-end">
                  <svg width="90" height="58" viewBox="0 0 90 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5602 37.6458C12.8885 44.6715 5.59527 52.3964 2.71924 55.7162H87.463V2L63.6386 31.9333C58.8469 37.9536 50.3729 39.832 43.3921 36.4211L38.8917 34.2222C32.3854 31.0432 24.5082 32.4352 19.5602 37.6458Z" fill="url(#paint0_linear_0_1)" />
                    <path d="M2.71924 55.7162C5.59527 52.3964 12.8885 44.6715 19.5602 37.6458C24.5082 32.4352 32.3854 31.0432 38.8917 34.2222L43.3921 36.4211C50.3729 39.832 58.8469 37.9536 63.6386 31.9333L87.463 2" stroke="#377F33" stroke-width="4" stroke-linecap="round" />
                    <defs>
                      <linearGradient id="paint0_linear_0_1" x1="45.0911" y1="8.71453" x2="48.3726" y2="55.727" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#2130B8" stop-opacity="0.3" />
                        <stop offset="1" stop-color="#2130B8" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <h4 className="text-right fz-sm m-0">
                  <strong>{userActivePercent}%</strong>
                </h4>
                <p className="text-right">
                  <small>than last week</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <VProgressBar />
        </div>
      </div>
    </div>
  );
}
