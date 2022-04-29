import React, { useEffect, useState } from "react";
import "./page6.scss";
import Tables from "./Table";
import { Row, Col } from "react-bootstrap";
import { baseUrl, DateTime, EmjsF, htmlDecode, jsonValue, toCapitalize } from "../../../../applocal";
import lesson from "../../../../services/lesson";
import LoadingAnim from "../../../../components/LoadingAnim";
import { BASE_URL } from "../../../../services/config.json";

const SixthPage = ({ data: course, onAddCart }) => {
  const [detail, setdetail] = React.useState(false);
  const [img_path, set_img_path] = useState("");

  const [formvalues, setformvalues] = useState({ course_pkg: "" });
  const [CourseLessons, setCourseLessons] = useState([]);
  const [CourseLessonLoading, setCourseLessonLoading] = useState(false);

  const packages = EmjsF(course?.avl_packages).parse();
  const getCourseLessons = () => {
    setCourseLessonLoading(true);
    setCourseLessons([]);
    lesson
      .getLessonByCourse(course?._id)
      .then(({ data: { data } }) => setCourseLessons(data.map((itm) => ({ ...itm, date: DateTime(itm.createdAt).stringFormat() }))))
      .finally(() => setCourseLessonLoading(false));
  };
  function returnPackages({ render = ({ duration, item, usd, jod, index }) => {} }) {
    return packages?.map((item, index) => {
      const {
        duration,
        price: { usd = "", jod = "" },
      } = item;
      return render({ duration: toCapitalize(duration), item, usd, jod, index });
    });
  }

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
  }, [jsonValue(course).toStringAll()]);

  return (
    <>
      <div className="container," style={{ overflow: "hidden", backgroundColor: "#c4c4c4" }}>
        <div className="bg-white rad-8  mb-3">
          <div className="p-2, rad_4 .my-4" style={{ position: "relative", background: "linear-gradient(to top, black, #BFBFBF)" }}>
            {/* {!CourseLessonLoading && CourseLessons.length < 1 && ( */}
            {true && (
              <div className="img" style={{ backgroundImage: `url(${img_path})`, backgroundPosition: "top", backgroundSize: "cover" }}>
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-sm-5" />
              </div>
            )}
            {/*   {CourseLessonLoading && (
              <div className="py-5">
                <LoadingAnim />
              </div>
            )}
           {CourseLessons.slice(0, 1).map((item, idx) => (
              <div key={idx}>
                <div
                  className=" bg-white."
                  //
                  dangerouslySetInnerHTML={{ __html: htmlDecode(item?.html).replace(/(width=")[\w]+(")/gi, "$1100%$2") }}
                />
                <h4 className="fz-2 fw-bold text-white px-4">{item?.name}</h4>
                <p className="fz-2 text-white px-4">
                  {detail && item?.description}

                  <button type="button" onClick={() => setdetail(!detail)} className="btn btn-sm text-white px-0">
                    {!detail ? "See" : "Hide"} Description
                  </button>
                </p>
              </div>
            ))} */}
            <div className="p-3">
              <div className="row">
                <div className="col-sm-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onAddCart(formvalues);
                    }}
                  >
                    <p className="div1p2.. text-white">Durations</p>
                    <div className="form-group d-flex ">
                      <div className="pr-3">
                        <select
                          name="course_pkg"
                          onChange={(e) => {
                            setformvalues({ course_pkg: e.target.value, course });
                          }}
                          className="w-100 form-control"
                          style={{ fontSize: 10 }}
                        >
                          <option value="" selected>
                            Select Package
                          </option>
                          {returnPackages({
                            render: ({ duration, item, usd, jod, index }) => (
                              <option key={index} value={jsonValue(item).toStringAll()}>
                                {duration} - {usd} USD - {jod} JOD
                              </option>
                            ),
                          })}
                        </select>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-sm btn-danger rad_10">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-sm-4">
                  <div className="text-right">
                    <button className="btn">
                      <i class="b-dark-1 text-white rounded-circle bi bi-three-dots-vertical p-relative" style={{ padding: "8px 12px 8px 12px" }}></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-4"></div>
            </div>
          </div>
          <Row className="div2 py-5 px-2 shadow-sm mx-2. rounded justify-content-around/  mt-2" style={{}}>
            <Col md={8} className="">
              <div className="col-12">
                <h4 className="m-0 mb-3 text-white." style={{ fontWeight: 600 }}>
                  {course?.name}
                </h4>
              </div>
              {/* <h3>{course?.name}</h3> */}
              <article
                className="mt-2"
                dangerouslySetInnerHTML={{
                  __html: course?.description,
                }}
              />
              {/* <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque blanditiis explicabo aspernatur quod sit commodi maxime praesentium laudantium ratione dolor, placeat nisi quam non. Eveniet sed dicta aut praesentium. Nulla.</p> */}
            </Col>
            <Col md={4} className="mt-5">
              <div className="bl-dark-1 pl-3">
                <DList
                  icon={<i class="bi bi-currency-dollar"></i>}
                  name="Course Price"
                  title={returnPackages({
                    render: ({ duration, usd, jod, index }) => (
                      <React.Fragment key={index}>
                        {duration} - {usd} USD - {jod} JOD <br />
                      </React.Fragment>
                    ),
                  })}
                />

                <DList icon={<i class="bi bi-calendar4-week"></i>} name="Date" title={course?.createdAt && DateTime(course?.createdAt).stringFormat()} />
              </div>
            </Col>
          </Row>
        </div>
        <label className="px-3 fz-2 text-white">Course Lists</label>
        <div className="row mt-3">
          <Tables data={CourseLessons} loading={CourseLessonLoading} />
        </div>
      </div>
    </>
  );
};
export function DList({ icon, title, name }) {
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="">
        <span className="fz-4" style={{ color: "blue" }}>
          {icon}
        </span>
      </div>
      <div className="pl-3 w-100">
        <span className="text-muted">{name}</span>
        <h6 className="p-0 m-0 fz-sm fw-bold">{title}</h6>
      </div>
    </div>
  );
}
export default SixthPage;
/*
This about the create ticket... it's purpose is to allow customer create ticket complain regarding any issues they might be having...
it does not necessary have to be on course...

The api has been done on the ticket area.... But you'll still need to add some more point to the ticket api.

in the ticket area; there should be a way for management/customer to reply back to the created ticket on the website.

The ticket reply end point parameter should hold ticket_id, user_id, status:"new | open | seen | closed" user_type:"management | customer"  and reply_response and other params you wish to add. The ticket reply api should be on it's own table in db... not same table with the created ticket table.
so that we can get ticket replies base on the created ticket_id



=======================================================

The question api also need same point...

in the question area; there should be a way for management/customer to reply back to the created ticket on the website.

The question reply end point parameter should hold question_id, user_id, status:"new | open | seen | closed" user_type:"management | customer" and reply_response and other params you wish to add. The question reply  api should be on it's own table in db.. not same table with the created question table.
so that we can get question replies base on the created question_id


There should also be a status:"read | pending | opened | closed" parameter to be on each of the tables ticket | ticket_reply | question | question_reply on the website...

this is for tracking status for notifications badge and other things on the website


one other api endpoint to add. this is for getting list of these api's by status. example by 'not read'... 
this is for the notifiicaton badge on the customer and management dashboard
===Example
/api/question/all?statusby=new
/api/question_reply/all?statusby=new
=
/api/ticket/all?statusby=new
/api/ticket_reply/all?statusby=new
==*
*/
