import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DateTime, jsonValue, toLowerCase } from "../../../applocal";
import APP_USER from "../../../services/APP_USER";
import lesson from "../../../services/lesson";

export default function EnrolledCourses({ title = "Enrolled Courses", data: Courses = [] }) {
  const [CourseLessonLoading, setCourseLessonLoading] = useState(false);
  const [CourseLessons, setCourseLessons] = useState([]);
  const [CourseData, setCourseData] = useState({});
  const { user, userRl } = useSelector((s) => s.auth);

  const getCourseLessons = (courseId) => {
    setCourseLessonLoading(true);
    // setCourseLessons([]);
    //  user?.id;
    return userRl == APP_USER.customer ? lesson.getLessonByCourseAndUser(courseId, user.id) : lesson.getLessonByCourse(courseId);
    // .then(({ data: { data } }) => setCourseLessons(data.map((itm) => ({ ...itm, date: DateTime(itm.createdAt).stringFormat() }))))
    // .finally(() => setCourseLessonLoading(false));
  };

  useEffect(() => {
    //  ConfirmOrder?.map((item) => item.courses?.some(({ courseId }) => courseId == dataParam));
    // console.log({ Courses });
    Promise.all(
      Courses.map(({ courses, startDate }) => {
        // console.log(courses, Courses);
        return Promise.all(
          courses.map(({ courseId, course }, idx) => {
            setCourseData((s) => ({ ...s, [courseId]: { _id: courseId, ...course, startDate } }));
            return getCourseLessons(courseId);
          })
        );
      })
    ).then((data) => {
      // console.log(data.map((s) => s.map(({ data: { data } }) => data)).flat(1));
      setCourseLessons(data.flatMap((s) => s.map(({ data: { data } }) => data)));
    });
  }, [jsonValue(Courses).toStringAll()]);

  function CourseLessonJSX() {
    return CourseLessons.slice(0, 3).map((item, idx) => {
      const jv = jsonValue;
      const startDate = jv(jv(CourseData).get(item[0]?.courseId)).get("startDate");
      const _sDate = DateTime(startDate).dateFormatted();
      const day = _sDate.day;
      const wday = _sDate.week;

      const lessonCompleted = item.filter((itm) => toLowerCase(itm.completedStatus) == "completed").length;
      const lessonTotal = item?.length;
      const lessonProg = Math.ceil((lessonCompleted / lessonTotal) * 100);

      return (
        item.length > 0 && (
          <EnrolledCourseProgress
            title={item[0]?.name}
            status={lessonProg == 100}
            lessonCompleted={lessonCompleted}
            lessonTotal={lessonTotal}
            progress={lessonProg}
            dayInt={day}
            dayString={wday}
            //
          />
        )
      );
    });
  }

  if (!CourseLessonLoading && CourseLessons.length < 1) return null;

  return (
    <div className="bg-white cs-table-style outline-shadow p-3">
      <div className="row align-items-center">
        <div className="col-8 p-0">
          <p className="fz-1-5 m-0 font-bold">{title}</p>
        </div>
        <div className="col-4 p-0 text-right"></div>
        <div className="divider border-0" />
      </div>
      <div>
        <CourseLessonJSX />
        {/* <EnrolledCourseProgress title={"Live Trading Course Lesson 07"} status={false} lessonCompleted="101" lessonTotal={400} progress={33} dayInt={2} dayString={"Tue"} />
        <EnrolledCourseProgress title={"Trader Mentality Course Lesson 22"} lessonCompleted="530" lessonTotal={530} progress={100} dayInt={5} dayString={"Fri"} /> */}
        {CourseLessons.length > 3 && (
          <div className="row">
            <div className="col-6">
              <p className="text-muted">{CourseLessons.length - 3} More courses</p>
            </div>
            <div className="col-6">
              <Link to={"/myCourses"} className="d-flex align-items-center p-1">
                <span className="pr-1 text-dark">View more</span>
                <svg width="15" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23.725 5.14888C23.7248 5.1486 23.7245 5.14827 23.7242 5.14799L18.8256 0.272997C18.4586 -0.0922061 17.865 -0.090847 17.4997 0.276184C17.1345 0.643168 17.1359 1.23675 17.5028 1.60199L20.7918 4.87499H0.9375C0.419719 4.87499 0 5.29471 0 5.81249C0 6.33027 0.419719 6.74999 0.9375 6.74999H20.7917L17.5029 10.023C17.1359 10.3882 17.1345 10.9818 17.4998 11.3488C17.865 11.7159 18.4587 11.7171 18.8256 11.352L23.7242 6.47699C23.7245 6.47671 23.7248 6.47638 23.7251 6.4761C24.0923 6.10963 24.0911 5.51413 23.725 5.14888Z"
                    fill="#000300"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EnrolledCourseProgress({ lessonCompleted = 0, title, lessonTotal = 0, progress = 0, dayString, dayInt, status = true }) {
  const color = status ? "#21b830" : "#000";
  const color2 = status ? "#21b830" : "#fff";
  return (
    <div className="d-flex align-items-center py-3">
      <div className="">
        <div className="avatar d-flex justify-content-center align-items-center flex-column p-relative text-center  .p-3" style={{ width: 70, height: 75, backgroundColor: status ? "white" : "#ebedff", border: "1px solid " + color2, borderRadius: 20 }}>
          <span className="d-block fz-3 fw-bold">{dayInt}</span>
          <span className="d-block fz-1">{dayString}</span>
          <span className="p-absolute d-inline-block p-bottom-0 m-auto" style={{ bottom: -8, border: "1px solid #fff", left: "auto", right: "35%", backgroundColor: color, padding: 8, borderRadius: 300 }} />
        </div>
      </div>
      <div className="details pl-2">
        <h3 className="fz-xm fw-bold m-0 p-0">{title}</h3>
        <div className="d-flex m-0 p-0 fz-xm">
          <div className="col-6  p-0">
            {progress}% {status ? "complete" : "On-going"}
          </div>
          <div className="col-6 text-right p-0">
            {lessonCompleted}/{lessonTotal}
          </div>
        </div>
        <svg width="100%" height="4" viewBox="0 0 214 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="214" height="4" rx="2" fill="#DDDDDD" />
          <rect width={progress + "%"} height="4" rx="2" fill={status ? "#21b830" : "#FF7A00"} />
        </svg>
      </div>
    </div>
  );
}
