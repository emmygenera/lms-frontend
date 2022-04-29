import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl, DateTime, htmlDecode, jsonValue } from "../../../applocal";
import LoadingAnim from "../../../components/LoadingAnim";
import { BASE_URL } from "../../../services/config.json";
import lesson from "../../../services/lesson";

export default function CoursePending({ data: Course = [] }) {
  const [img_path, set_img_path] = useState("");
  const [CourseLessonLoading, setCourseLessonLoading] = useState(false);
  const [CourseLessons, setCourseLessons] = useState([]);

  const courses = Course?.courses;
  const course_d = jsonValue(courses, {}).get(0);
  const course = course_d.course;
  const courseId = course_d.courseId;
  // console.log({ course_d, courseId });
  const getCourseLessons = () => {
    setCourseLessonLoading(true);
    setCourseLessons([]);
    lesson
      .getLessonByCourse(courseId)
      .then(({ data: { data } }) => setCourseLessons(data.map((itm) => ({ ...itm, date: DateTime(itm.createdAt).stringFormat() }))))
      .finally(() => setCourseLessonLoading(false));
  };

  useEffect(() => {
    getCourseLessons();
    const img = new Image();
    const img_src = BASE_URL + (course?.image || course?.images[0])?.url;
    img.src = img_src;
    img.onerror = () => {
      console.log(img_path);
      set_img_path(baseUrl("default-image.png"));
    };
    img.onload = () => {
      set_img_path(img_src);
    };
  }, []);
  // console.log(CourseLessons);
  if (!CourseLessonLoading && CourseLessons.length < 1) return null;
  return (
    <div className="p-2, rad_4 my-4. mb-4" style={{ position: "relative", background: "linear-gradient(to top, black, #BFBFBF)" }}>
      {/* {!CourseLessonLoading && CourseLessons.length < 1 && (
        <div
          className="img"
          // style={{ backgroundImage: `url(${img_path})`, backgroundPosition: "top", backgroundSize: "cover" }}
        >
          <div className="py-5" />
          <div className="py-5" />
          <div className="py-5" />
          <div className="py-sm-5" />
        </div>
      )} */}
      <div className="p-3.">
        {CourseLessonLoading && (
          <div className="py-5">
            <LoadingAnim />
          </div>
        )}
        {CourseLessons?.slice(0, 1).map((item, idx) => (
          <div key={idx}>
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
              // dangerouslySetInnerHTML={{ __html: htmlDecode(item?.html).replace(/(width=")[\w]+(")/gi, "$1100%$2") }}
            />
            <div className="p-3">
              <h4 className="m-0 mb-3 text-white resize-350 " style={{ fontWeight: 600 }}>
                {item?.name}
              </h4>
              <Link to={"viewCourse?data=" + courseId} className="btn resize-150 align-items-center d-flex text-white rad_4" style={{ background: "#a11e1e" }}>
                <span className="pr-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.648712 9.33105V14.3329C0.648712 15.2525 1.39698 16.0001 2.31597 16.0001H14.3203C15.24 16.0001 15.9875 15.2525 15.9875 14.3329V9.33105H0.648712V9.33105Z" fill="white" />
                    <path d="M7.89533 1.5249L5.39975 2.11712L7.4905 5.19356L10.1935 4.57869L7.89533 1.5249Z" fill="white" />
                    <path d="M4.70616 2.28174L2.01651 2.91928L4.08525 5.96707L6.79223 5.3515L4.70616 2.28174Z" fill="white" />
                    <path d="M15.9769 2.90997L15.4093 0.757192C15.2786 0.23366 14.7424 -0.0957707 14.2136 0.0249289L11.9727 0.55712L14.0989 3.69159L15.7281 3.3208C15.8168 3.30079 15.8928 3.24543 15.9395 3.16809C15.9862 3.09075 15.9995 2.998 15.9769 2.90997Z" fill="white" />
                    <path d="M11.2785 0.721924L8.60358 1.35681L10.9057 4.41725L13.4006 3.8497L11.2785 0.721924Z" fill="white" />
                    <path d="M4.00924 5.99707L2.9422 8.66404H5.55849L6.62553 5.99707H4.00924Z" fill="white" />
                    <path d="M7.34377 5.99707L6.27673 8.66404H8.89299L9.96006 5.99707H7.34377Z" fill="white" />
                    <path d="M15.6541 5.99707H14.0129L12.9458 8.66469H15.9876V6.3305C15.9875 6.14578 15.8388 5.99707 15.6541 5.99707Z" fill="white" />
                    <path d="M10.6783 5.99707L9.61124 8.66404H12.2269L13.2946 5.99707H10.6783Z" fill="white" />
                    <path d="M1.32296 3.08472L0.779418 3.21342C0.514667 3.27344 0.290587 3.43416 0.148536 3.66493C0.00648451 3.89635 -0.0355306 4.16845 0.0304931 4.43186L0.648715 6.8754V8.66404H2.22394L3.22495 6.16248L3.38767 6.12581L1.32296 3.08472Z" fill="white" />
                  </svg>
                </span>
                Continue Lesson
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
