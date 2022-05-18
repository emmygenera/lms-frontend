import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { Link } from "react-router-dom";
import { pmac } from "./routing/indexRoutes";
import { arraySort, baseUrl, DateTime, EmjsF, jsonValue, objectOnly, objectRemove, object_entries } from "./applocal";
import APP_USER from "./services/APP_USER";
import orderService from "./services/orders";
import { toast } from "react-toastify";
import { packagesValue } from "./pages/courses/component/Data.json";
import { setNotification, setSearchString } from "./redux/actions/generalActions";
import NotifcationAPI from "./services/NotificationAPI";
import QuickAddURL from "./routing/QuickAddURL";

export const AppTopbar = (props) => {
  const [CoursesOrder, setCoursesOrder] = useState();
  const [Loading, setLoading] = useState(false);
  const [SearchValue, setSearchValue] = useState("");
  const { heading } = useSelector((state) => state.menu);
  const { user, userRl } = useSelector((state) => state.auth);
  const isPerm = pmac([APP_USER.customer]).includes(userRl);
  const { carts, addons_purchase } = useSelector((s) => s.globals);

  const { notifications: NotifcationData } = useSelector((s) => s.general);

  const [NotifcationDataURL] = useState({
    //
    courseNotifcations: { title: "New notifcations on courses", url: "courses" },
    messageNotifications: { title: "New notifications on messages", url: "messages" },
    ticketNotifications: { title: "New notifications on tickets", url: "tickets" },
    questionNotifications: { title: "New notifications on questions", url: "questions" },
    orderNotifications: { title: "New notifications on orders", url: "orders" },
  });

  const dispatch = useDispatch();

  const cartsData = object_entries(carts);
  const addonsData = object_entries(addons_purchase);

  const orderLen = cartsData.length > 0;
  const addonsLen = addonsData.length > 0;
  const len = orderLen || addonsLen;

  function getCoures() {
    setLoading(true);
    orderService
      .myOrders({ id: user?.id })
      .then(({ data }) => {
        setCoursesOrder(data);
      })
      .catch(() => toast.error("Opps! Error getting courses"))
      .finally(() => setLoading(false));
  }
  function oncheckOut() {
    if (!len) return;
    window.location.replace("#/checkOut");
  }
  const onSearchChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setSearchValue(val);

    dispatch(setSearchString(val));

    const searchUrl = userRl == APP_USER.customer ? "allCourses?" : "adminCourses?pageNo=1&pageSize=15&";
    window.location.replace(baseUrl(`#/${searchUrl}search=` + val));
  };

  useEffect(() => {
    getCoures();
  }, []);

  const data = CoursesOrder?.data || [];

  const NotifyData = objectRemove(NotifcationData, ["messageNotifications"]);
  const messageNotifications = objectOnly(NotifcationData, ["messageNotifications"]);

  const isMessg = NotifcationData?.messageNotifications?.length > 0;
  const isNotify = EmjsF(NotifyData)
    .objList(({ value }) => value.length)
    ?.some((v) => v > 0);
  function closeNotifications() {
    Promise.all(
      EmjsF(NotifyData)
        .objList(({ key, value }) => value)
        .flat(1)
        .map((itm) => itm && NotifcationAPI.closeNotifications(itm?._id))
    ).then(() => {
      //dispatch(setNotification(messageNotifications));
    });
  }
  function closeMsgNotification() {
    Promise.all(
      EmjsF(messageNotifications)
        .objList(({ key, value }) => value)
        .flat(1)
        .map((itm) => itm && NotifcationAPI.closeNotifications(itm?._id))
    ).then(() => {
      dispatch(setNotification(NotifyData));
    });
  }
  // console.log(
  //   arraySort(
  //     EmjsF(NotifyData)
  //       .objList(({ key, value }) => value?.map((itm) => ({ key, ...itm })))
  //       .flat(1)
  //   )
  //     .sortBy((b) => b?.createdAt)
  //     .map(
  //       (itm) =>
  //         itm && (
  //           <p className="py-3">
  //             <Link to={NotifcationDataURL[itm?.key]?.url}>
  //               {itm?.notificationText}
  //               {/* {NotifcationDataURL[key].title}({value?.length}) */}
  //             </Link>
  //           </p>
  //         )
  //     )
  // );
  return (
    <div className="layout-topbar clearfix d-flex" style={{ backgroundColor: "#ffffff", top: "0px", paddingTop: "20px", height: "70px" }}>
      <div>
        <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
          {/* <span className="pi pi-bars" /> */}
          <img src={baseUrl("images/menu.png")} style={{ marginTop: "-5px" }} />
        </button>
      </div>
      <div>
        <span
          style={{ fontSize: "1.5em", color: "#000000" }}
          // style={{ marginLeft: "30px", marginRight: "100px", fontSize: "1.5em", color: "#000000" }}
        >
          <b className="px-3">{String(heading).replace(",", " ")}</b>
        </span>
      </div>
      <div
        className="layout-topbar-search p-relative"
        //  style={{ position: "absolute", top: "20px", left: "300px" }}
      >
        <InputText defaultValue={SearchValue} type="text" onChange={onSearchChange} placeholder="Search here" style={{ borderRadius: "2rem", width: "100%" }} />
        <span type="button" className="btn. layout-topbar-search-icon pi pi-search" style={{ width: "23.99px", height: "24px", position: "absolute", right: "10px", top: "12px", color: "#A4A4A4" }} />
      </div>
      <div className="p-relative. px-3">
        <div className="layout-topbar-icons d-flex w-100" id="layout-icons" style={{ marginTop: "10px" }}>
          <span className="dropdown">
            <button onClick={closeNotifications} type="button" className="p-link  dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
              <svg width="44" height="42" viewBox="0 0 64 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="6" width="56" height="56" rx="28" fill="#EFEFEF" />
                <path
                  d="M36.75 35.8385V33.0463C36.7471 30.8855 35.9385 28.8035 34.4821 27.2073C33.0258 25.6112 31.0264 24.6156 28.875 24.4152V22.625C28.875 22.3929 28.7828 22.1704 28.6187 22.0063C28.4546 21.8422 28.2321 21.75 28 21.75C27.7679 21.75 27.5454 21.8422 27.3813 22.0063C27.2172 22.1704 27.125 22.3929 27.125 22.625V24.4153C24.9736 24.6157 22.9743 25.6113 21.5179 27.2075C20.0616 28.8036 19.2529 30.8855 19.25 33.0463V35.8383C18.2626 36.0412 17.3753 36.5784 16.7377 37.3593C16.1002 38.1401 15.7513 39.1169 15.75 40.125C15.7508 40.821 16.0276 41.4882 16.5197 41.9803C17.0118 42.4724 17.679 42.7492 18.375 42.75H23.7135C23.9152 43.738 24.452 44.6259 25.2331 45.2636C26.0142 45.9013 26.9916 46.2497 28 46.2497C29.0084 46.2497 29.9858 45.9013 30.7669 45.2636C31.548 44.6259 32.0848 43.738 32.2865 42.75H37.625C38.321 42.7492 38.9882 42.4724 39.4803 41.9803C39.9724 41.4882 40.2492 40.821 40.25 40.125C40.2486 39.117 39.8998 38.1402 39.2622 37.3594C38.6247 36.5786 37.7374 36.0414 36.75 35.8385ZM21 33.0463C21.0023 31.2113 21.7323 29.4522 23.0297 28.1547C24.3272 26.8573 26.0863 26.1273 27.9212 26.125H28.0788C29.9137 26.1273 31.6728 26.8573 32.9703 28.1547C34.2677 29.4522 34.9977 31.2113 35 33.0463V35.75H21V33.0463ZM28 44.5C27.4589 44.4983 26.9316 44.3292 26.4905 44.0159C26.0493 43.7026 25.716 43.2604 25.5363 42.75H30.4637C30.284 43.2604 29.9507 43.7026 29.5095 44.0159C29.0684 44.3292 28.5411 44.4983 28 44.5ZM37.625 41H18.375C18.143 40.9999 17.9205 40.9076 17.7564 40.7436C17.5924 40.5795 17.5001 40.357 17.5 40.125C17.5008 39.429 17.7776 38.7618 18.2697 38.2697C18.7618 37.7776 19.429 37.5008 20.125 37.5H35.875C36.571 37.5008 37.2382 37.7776 37.7303 38.2697C38.2224 38.7618 38.4992 39.429 38.5 40.125C38.4999 40.357 38.4076 40.5795 38.2436 40.7436C38.0795 40.9076 37.857 40.9999 37.625 41Z"
                  fill="#179A0F"
                />
                {isNotify && <circle cx="51" cy="13" r="11.5" fill="#FF2626" stroke="white" stroke-width="3" />}
              </svg>
            </button>
            <div class="dropdown-menu" style={{ minWidth: "17rem" }} aria-labelledby="dropdownMenuButton">
              <div className="p-3">
                {arraySort(
                  EmjsF(NotifyData)
                    .objList(({ key, value }) => value?.map((itm) => ({ key, ...itm })))
                    .flat(1)
                )
                  .sortBy((b) => b?.createdAt)
                  .map(
                    (itm) =>
                      itm && (
                        <p className="py-3">
                          <Link to={NotifcationDataURL[itm?.key]?.url}>
                            {itm?.notificationText}
                            {/* {NotifcationDataURL[key].title}({value?.length}) */}
                          </Link>
                        </p>
                      )
                  )}
                {/* onClick={() => window.location.replace(baseUrl("#/tickets"))} */}
                {/* {EmjsF(NotifyData).objList(
                  ({ key, value }) =>value?.map((itm)=>({key,...itm}))
                    // value?.length > 0 && (
                    //   <p className="py-3">
                    //     <Link to={NotifcationDataURL[key].url}>
                    //       {NotifcationDataURL[key].title}({value?.length})
                    //     </Link>
                    //   </p>
                    // )
                )}  */}
                {/* {EmjsF(NotifyData).objList(
                  ({ key, value }) =>
                    value?.length > 0 && (
                      <p className="py-3">
                        <Link to={NotifcationDataURL[key].url}>
                          {NotifcationDataURL[key].title}({value?.length})
                        </Link>
                      </p>
                    )
                )} */}
              </div>
            </div>
          </span>
          {isPerm ? (
            <>
              <button type="button" className="p-link" onClick={oncheckOut}>
                <svg width="46" height="42" viewBox="0 0 66 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="6" width="56" height="56" rx="28" fill="#EFEFEF" />
                  {len && <circle cx="53" cy="13" r="11.5" fill="#FF2626" stroke="white" stroke-width="3" />}
                  <ellipse cx="25.2632" cy="43.1804" rx="1.81955" ry="1.81955" fill="#219653" />
                  <ellipse cx="31.3283" cy="43.1804" rx="1.81955" ry="1.81955" fill="#219653" />
                  <path
                    d="M17.0476 24.0476C18.8911 24.9694 19.8045 25.7752 19.8045 28.0175M19.8045 28.0175C19.8045 37.1153 22.2306 38.9348 28.2957 38.9348C34.3609 38.9348 36.787 37.1153 36.787 29.8371C36.787 28.8156 36.1804 28.0175 34.9674 28.0175C33.7544 28.0175 23.845 28.0175 19.8045 28.0175Z"
                    stroke="#219653"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <span className="dropdown">
                <button className="btn d-flex align-items-center rad_10 ml-5 float_r. .float_right btn-dark  dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
                  <span className="pr-3">
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M14 1V5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M6 1V5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  {!Loading
                    ? data?.slice(0, 1)?.map(({ courses, startDate, ...order }) => {
                        return courses?.slice(0, 1)?.map(({ course, ..._o }) => {
                          const months = packagesValue[_o?.coursePackage?.duration],
                            inTime = DateTime(startDate).addMonths(months),
                            expireIn = DateTime(inTime).daysToGo(),
                            expireInString = expireIn == -1 ? "Expired" : expireIn + " Day" + (expireIn > 1 ? "s" : "") + " Remaining";

                          return <span>{expireInString}</span>;
                        });
                      }) || "No Subscription"
                    : "Loading..."}
                  <span className="pl-2">
                    {/* <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6L6 2.62268e-07L12 6" fill="#BEC5FF" />
                  </svg> */}
                  </span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div className="p-3">
                    {!Loading ? (
                      data?.map(({ courses, startDate, ...order }) => {
                        return courses?.map(({ courseId, course, ..._o }) => {
                          const months = packagesValue[_o?.coursePackage?.duration],
                            inTime = DateTime(startDate).addMonths(months),
                            expireIn = DateTime(inTime).daysToGo(),
                            expireInString = expireIn == -1 ? "Expired" : expireIn + " Day" + (expireIn > 1 ? "s" : "") + " Remaining";

                          return (
                            <Link to={"viewCourse?data=" + courseId} className="p-2 text-dark">
                              {course.name}
                              <p className="text-warning">{expireInString}</p>
                            </Link>
                          );
                        });
                      }) || "No Subscription"
                    ) : (
                      <p className="p-2">Loading...</p>
                    )}
                  </div>
                </div>
              </span>
            </>
          ) : (
            // <span className="dropdown">
            //   <button type="button" className="p-link nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
            //     <img src={baseUrl("images/profile.png")} id="bg-icon" width="35px" height="38px" sstyle={{ position: "absolute", top: "-20px" }} />
            //   </button>
            //   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <>
              <button
                type="button"
                className="p-link"
                onClick={() => {
                  closeMsgNotification();
                  window.location.replace(baseUrl("#/messages"));
                }}
              >
                <svg width="46" height="42" viewBox="0 0 66 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="6" width="56" height="56" rx="28" fill="#EFEFEF" />
                  <path
                    d="M36.4604 23.8489H19.3168C18.6474 23.8496 18.0057 24.1159 17.5323 24.5892C17.059 25.0625 16.7928 25.7043 16.792 26.3737V38.1562C16.7928 38.8256 17.059 39.4674 17.5323 39.9407C18.0057 40.4141 18.6474 40.6803 19.3168 40.6811C19.54 40.6812 19.754 40.7699 19.9118 40.9277C20.0696 41.0855 20.1583 41.2995 20.1585 41.5227V43.3168C20.1585 43.6215 20.2411 43.9204 20.3977 44.1818C20.5543 44.4431 20.7788 44.6571 21.0474 44.8009C21.316 44.9446 21.6186 45.0128 21.9229 44.9981C22.2273 44.9834 22.5219 44.8863 22.7754 44.7173L28.6173 40.8224C28.7554 40.7299 28.9179 40.6807 29.0841 40.6811H33.187C33.7383 40.68 34.2743 40.4994 34.7137 40.1664C35.1531 39.8335 35.472 39.3664 35.6222 38.8359L38.8965 27.0501C38.9999 26.6748 39.0152 26.2807 38.9413 25.8986C38.8675 25.5164 38.7064 25.1564 38.4707 24.8466C38.235 24.5369 37.9309 24.2857 37.5823 24.1126C37.2336 23.9396 36.8497 23.8493 36.4604 23.8489V23.8489ZM37.2733 26.603L34.0006 38.3847C33.95 38.5614 33.8432 38.7168 33.6964 38.8275C33.5496 38.9381 33.3708 38.9979 33.187 38.9978H29.0841C28.5856 38.9972 28.0981 39.1448 27.6836 39.4219L21.8417 43.3168V41.5227C21.8409 40.8533 21.5747 40.2115 21.1014 39.7382C20.628 39.2648 19.9862 38.9986 19.3168 38.9978C19.0937 38.9977 18.8797 38.909 18.7219 38.7512C18.5641 38.5934 18.4754 38.3794 18.4752 38.1562V26.3737C18.4754 26.1505 18.5641 25.9365 18.7219 25.7787C18.8797 25.6209 19.0937 25.5322 19.3168 25.5321H36.4604C36.5905 25.5324 36.7188 25.5628 36.8352 25.6208C36.9517 25.6788 37.0532 25.7628 37.1318 25.8665C37.2105 25.9701 37.2641 26.0905 37.2887 26.2182C37.3132 26.346 37.3079 26.4777 37.2733 26.603V26.603Z"
                    fill="#179A0F"
                  />
                  <path
                    d="M21.8417 31.4235H26.0497C26.2729 31.4235 26.487 31.3348 26.6448 31.177C26.8027 31.0191 26.8913 30.8051 26.8913 30.5818C26.8913 30.3586 26.8027 30.1446 26.6448 29.9867C26.487 29.8289 26.2729 29.7402 26.0497 29.7402H21.8417C21.6185 29.7402 21.4044 29.8289 21.2466 29.9867C21.0887 30.1446 21.0001 30.3586 21.0001 30.5818C21.0001 30.8051 21.0887 31.0191 21.2466 31.177C21.4044 31.3348 21.6185 31.4235 21.8417 31.4235Z"
                    fill="#179A0F"
                  />
                  <path
                    d="M29.4162 33.1067H21.8417C21.6185 33.1067 21.4044 33.1954 21.2466 33.3532C21.0887 33.511 21.0001 33.7251 21.0001 33.9483C21.0001 34.1715 21.0887 34.3856 21.2466 34.5434C21.4044 34.7012 21.6185 34.7899 21.8417 34.7899H29.4162C29.6394 34.7899 29.8534 34.7012 30.0113 34.5434C30.1691 34.3856 30.2578 34.1715 30.2578 33.9483C30.2578 33.7251 30.1691 33.511 30.0113 33.3532C29.8534 33.1954 29.6394 33.1067 29.4162 33.1067Z"
                    fill="#179A0F"
                  />
                  {isMessg && <circle cx="53" cy="13" r="11.5" fill="#FF2626" stroke="white" stroke-width="3" />}
                </svg>

                {/* <img src="/images/chat.png" width="40px" height="38px" /> */}
              </button>
              <div>
                <span className="dropdown">
                  <button type="button" className="p-link nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown">
                    <img src={baseUrl("images/profile.png")} id="bg-icon" width="35px" height="38px" sstyle={{ position: "absolute" }} />
                  </button>
                  {/* <Link class="dropdown-item" to="/newCourse"> */}
                  {/* <img src={baseUrl("images/profile.png")} id="bg-icon" width="35px" height="38px" sstyle={{ position: "absolute", top: "-20px" }} /> */}
                  {/* </Link> */}
                  <div class="dropdown-menu" sstyle={{ minWidth: "13rem" }} aria-labelledby="dropdownMenuButton">
                    <div className="p-3">
                      {QuickAddURL.map(
                        ({ lable, url, perm }) =>
                          perm.includes(userRl) && (
                            <p className="py-1 .text-center">
                              <Link to={url} className="text-dark">
                                {lable}
                              </Link>
                            </p>
                          )
                      )}
                    </div>
                  </div>
                </span>
              </div>
            </>
            //   </div>
            // </span>
          )}
        </div>
      </div>
    </div>
  );
};
