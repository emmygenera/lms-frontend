import classNames from "classnames";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl, DateTime, htmlDecode, jsonValue, Range, toLowerCase } from "../../../../applocal";
import LoadingAnim from "../../../../components/LoadingAnim";
import ls from "../../../../services/lesson";
import { DList } from "../page6";
import Tables from "../page6/Table";
import "./livetrading.scss";
import Table from "./Table";
import { BASE_URL } from "../../../../services/config.json";
import { Link } from "react-router-dom";

const mk = { isComplete: true };
const LivePage = ({ clickToNextSlide, reloadFrame, MarkedAsComplete: [MarkedAsComplete, setMarkedAsComplete], expireInString, isManagement = false, course, LessonData: [CourseLessons = [], setCourseLessons], CourseLessonLoading, CourseLoading, avl_addons, returnPackages, onNext, onComplete }) => {
  const [detail, setdetail] = React.useState(false);
  const [isMarkedAsComplete, setisMarkedAsComplete] = React.useState([]);
  const [img_path, set_img_path] = React.useState("");

  const [NextSlide, setNextSlide] = React.useState(0);
  const { user } = useSelector((s) => s.auth);
  function markLessionsCompleted(lesson, idx) {
    isMarkedAsComplete[idx] = true;
    setisMarkedAsComplete(isMarkedAsComplete.concat([]));
    if (toLowerCase(lesson?.completedStatus) == "completed") return;
    ls.getMarkComplete({ lessionId: lesson?._id, userId: user?.id }).then(() => {
      const MarkedAsComplete_ = MarkedAsComplete;
      MarkedAsComplete_[idx] = mk;
      setMarkedAsComplete(MarkedAsComplete_.concat([]));
      //
      isMarkedAsComplete[idx] = false;
      setisMarkedAsComplete(isMarkedAsComplete.concat([]));
      //
      setCourseLessons(CourseLessons.map((v) => (v._id == lesson?._id ? { ...v, completedStatus: "Completed" } : v)).concat([]));
      // console.log(lesson?._id, idx);
      toast.success("Lesson marked as completed!...");
    });
  }

  useEffect(() => {
    const img = new Image();
    const img_src = BASE_URL + (course?.image || course?.images[0])?.url;
    img.src = img_src;
    img.onerror = () => {
      set_img_path(baseUrl("default-image.png"));
    };
    img.onload = () => {
      set_img_path(img_src);
    };
  }, [jsonValue(course).toStringAll()]);
  // console.log({ MarkedAsComplete });
  let lessonActive = false,
    activeString = "active";

  const lessonCompleted = CourseLessons.filter((itm) => toLowerCase(itm.completedStatus) == "completed").length;
  const lessonTotal = CourseLessons?.length;
  const lessonProg = Math.ceil((lessonCompleted / lessonTotal) * 100);

  if (CourseLessonLoading || CourseLoading) return <LoadingAnim />;
  return (
    <>
      <div className="container," style={{ overflow: "hidden", backgroundColor: "#fafafa" }}>
        <div className="bg-white rad-8  mb-3">
          <div>
            <div
              id="carouselExampleControls"
              class="carousel slide rad-8" //
              style={{ position: "relative", background: "linear-gradient(to top, black, #BFBFBF)" }}
              data-ride="carousel"
              data-interval="false"
            >
              {!CourseLessonLoading && CourseLessons.length < 1 && (
                <div className="img" style={{ backgroundImage: `url(${img_path})`, backgroundPosition: "top", backgroundSize: "cover" }}>
                  {Range(0, 5, <div className="py-5" />)}
                  <div className="py-sm-5" />
                </div>
              )}
              <div class="carousel-inner">
                {CourseLessons.map((item, idx) => {
                  if (toLowerCase(item?.completedStatus) !== "completed" && !lessonActive) {
                    lessonActive = true;
                    activeString = "active";
                  }
                  if (CourseLessons.length == idx + 1 && !lessonActive) {
                    activeString = "active";
                    lessonActive = true;
                  }
                  // const idx_ = idx - 1 == -1 ? idx : idx - 1;
                  const canNext = toLowerCase(item?.completedStatus) == "completed";
                  // console.log({ idx_, canNext, completedStatus: item?.completedStatus });

                  const _isComp = isMarkedAsComplete[idx] || toLowerCase(item?.completedStatus) == "completed" || MarkedAsComplete[idx]?.isComplete,
                    isComp = _isComp == "null" ? false : _isComp;
                  // console.log(clickToNextSlide, clickToNextSlide[idx]?.active ? idx : "");
                  const className = classNames("carousel-item ", { [activeString]: lessonActive });
                  //  "carousel-item " + (lessonActive ? activeString : "")
                  const _jsx = (
                    // <div class={"carousel-item " + (idx == 0 ? " active " : "")}>
                    <div class={className}>
                      {!item?.html && (
                        <div className="img" style={{ backgroundImage: `url(${BASE_URL + item?.images[0]?.url || img_path})`, backgroundPosition: "top", backgroundSize: "cover" }}>
                          {Range(0, 5, <div className="py-5" />)}
                          <div className="py-sm-5" />
                        </div>
                      )}
                      <div
                        className=" bg-white."
                        //
                        dangerouslySetInnerHTML={{
                          __html: htmlDecode(
                            String(item?.html)
                              .trim()
                              .replace(/(^<[^>]+>|\n|<[^>]>$)/gi, (v) => "")
                          ).replace(/(width=")[\w]+(")/gi, "$1100%$2"),
                        }}
                      />
                      <h4 className="fz-2 fw-bold text-white px-3">{item?.name}</h4>
                      <p className="fz-2 text-white px-3">
                        {detail && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          />
                        )}
                        <div>
                          <button type="button" onClick={() => setdetail(!detail)} className="btn btn-sm  text-white px-0">
                            {!detail ? "See" : "Hide"} Description
                          </button>
                        </div>
                      </p>
                      <div className="carousel-controls pb-3">
                        <div className="d-flex align-items-center flex-wrap p-relative">
                          {idx > 0 && (
                            <div className="p-3">
                              <button
                                className="btn btn-danger btn-sm rad_10 px-3"
                                //
                                type="button"
                                data-target="#carouselExampleControls"
                                data-slide="prev"
                              >
                                Prev Lesson
                              </button>
                            </div>
                          )}
                          {!isManagement && (
                            <div className="p-3">
                              <button disabled={isComp} type="button" onClick={() => markLessionsCompleted(item, idx)} className="btn btn-danger btn-sm rad_10 px-3">
                                {isMarkedAsComplete[idx] ? "Marking Lesson..." : isComp ? "Completed" : "Mark As Complete"}
                              </button>
                            </div>
                          )}
                          {CourseLessons.length !== idx + 1 && (
                            <div className="p-3">
                              <button
                                className="btn btn-danger btn-sm rad_10 px-3"
                                type="button"
                                data-target="#carouselExampleControls"
                                data-slide="next"
                                disabled={!canNext}
                                onClick={() => {
                                  setNextSlide(idx);
                                  reloadFrame();
                                }}
                              >
                                Next Lesson
                              </button>
                            </div>
                          )}
                          {/* <div className="p-3">
                            <Link
                              to={`/addQuestion?data=${encodeURIComponent(jsonValue({ id: course?._id, title: course?.name, lssn: item?._id, lssntt: item?.name }).toStringAll())}`}
                              //
                              className="p-absolute rad_10 p-bottom-0  p-right-05 btn btn-sm btn-info text-white .px-0 ml-1"
                            >
                              Ask Question
                            </Link>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                  activeString = "";
                  return _jsx;
                })}
              </div>
            </div>
          </div>
          {isManagement && (
            <Row className="div2 py-5 px-2 shadow-sm mx-2. rounded justify-content-around/  mt-2" style={{}}>
              <Col md={8} className="">
                <article
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: course?.description,
                  }}
                />
              </Col>
              <Col md={4} className="mt-5">
                <div className="bl-dark-1 pl-3">
                  {isManagement ? (
                    <DList
                      icon={<i class="bi bi-currency-dollar"></i>}
                      name="Course Price"
                      title={returnPackages({
                        render: ({ duration, usd, jod, index }) => (
                          <div className="mb-1 pb-1" key={index}>
                            {String(duration).replace("_", " ")} - {usd} USD - {jod} JOD <br />
                          </div>
                        ),
                      })}
                    />
                  ) : (
                    <>
                      <DList
                        icon={<i class="bi bi-eye"></i>}
                        name="Watch Progress"
                        title={
                          <>
                            <div className="pb-1">
                              {lessonCompleted}/{lessonTotal}
                            </div>
                            <div className="progress" style={{ height: ".4rem" }}>
                              <div className="progress-bar" style={{ width: lessonProg + "%", backgroundColor: lessonProg == 100 && "#2bc32b" }}></div>
                            </div>
                          </>
                        }
                      />
                      <DList icon={<i class="bi bi-clock"></i>} name="Expires In" title={expireInString} />{" "}
                    </>
                  )}
                  <DList icon={<i class="bi bi-calendar4-week"></i>} name="Date" title={course?.createdAt && DateTime(course?.createdAt).stringFormat()} />
                </div>
              </Col>
            </Row>
          )}
        </div>
        {/* <div className=" mt-3 outline-shadow bg-white ">
          <h4 className="p-3 fz-2.">Attachments and Addons</h4>
          <div className="row mt-3">
            <Tables
              data={avl_addons}
              columns={[
                {
                  title: "ID",
                  dataIndex: "index",
                },
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Type",
                  dataIndex: "type",
                },
                {
                  title: "Links",
                  dataIndex: "link",
                },
              ]}
              loading={CourseLessonLoading}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default LivePage;
/*
<div className="p-2 rad_4 .my-4" style={{ position: "relative", background: "linear-gradient(to top, black, #BFBFBF)" }}>
            <div className="py-5" />
            <div className="py-5" />
            <div className="py-sm-5" />
            <div className="p-3">
              <div className="col-12">
                <h4 className="m-0 mb-3 text-white " style={{ fontWeight: 600 }}>
                  {course?.name}
                </h4>
              </div>
              <div className="d-flex align-items-center flex-wrap">
                <div className="p-3">
                  <button className="btn btn-danger btn-sm rad_10 px-3">Prev Lesson</button>
                </div>
                <div className="p-3">
                  <button className="btn btn-danger btn-sm rad_10 px-3">Mark As Complete</button>
                </div>
                <div className="p-3">
                  <button className="btn btn-danger btn-sm rad_10 px-3">Next Lesson</button>
                </div>
              </div>
              <div className="py-4"></div>
            </div>
          </div>
*/
