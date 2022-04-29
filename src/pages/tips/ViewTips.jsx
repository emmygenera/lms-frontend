import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { baseUrl, DateTime, EmjsF, htmlDecode, jsonValue, setImageIfError, toCapitalize } from "../../applocal";
import LoadingAnim from "../../components/LoadingAnim";
import { BASE_URL } from "../../services/config.json";

export default function ViewTips({ data: tip, onAddCart }) {
  const [img_path, set_img_path] = useState("");
  const packages = EmjsF(tip?.avl_packages).parse();

  useEffect(() => {
    setImageIfError(
      BASE_URL + (tip?.image || tip?.images[0])?.url,
      () => {
        set_img_path(baseUrl("default-image.png"));
      },
      (img_src) => {
        set_img_path(img_src);
      }
    );
  }, [jsonValue(tip).toStringAll()]);

  return (
    <>
      <div className="container," style={{ overflow: "hidden", backgroundColor: "#c4c4c4" }}>
        <div className="bg-white rad-8  mb-3">
          <div className="p-2, rad_4 .my-4" style={{ position: "relative", background: "linear-gradient(to top, black, #BFBFBF)" }}>
            {tip?.htmlcontent && String(tip?.htmlcontent).includes("iframe") ? (
              <div>
                <div
                  //
                  datatype_={tip?.htmlcontent}
                  datatyped={htmlDecode(tip?.htmlcontent)}
                  datatype={htmlDecode(tip?.htmlcontent).replace(/(width=")[\w]+(")/gi, "$1100%$2")}
                  className=" bg-white."
                  dangerouslySetInnerHTML={{ __html: htmlDecode(tip?.htmlcontent).replace(/(width=")[\w]+(")/gi, "$1100%$2") }}
                />
              </div>
            ) : (
              <div className="img" style={{ backgroundImage: `url(${img_path})`, backgroundPosition: "top", backgroundSize: "cover" }}>
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-5" />
                <div className="py-sm-5" />
              </div>
            )}
          </div>
          <Row className="div2 py-5 px-2 shadow-sm mx-2. rounded justify-content-around/  mt-2" style={{}}>
            <Col md={8} className="">
              <div className="col-12">
                <h4 className="m-0 mb-3 text-white." style={{ fontWeight: 600 }}>
                  {tip?.title}
                </h4>
              </div>
              <p
                className="mt-2"
                dangerouslySetInnerHTML={{
                  __html: tip?.description,
                }}
              />
            </Col>
            <Col md={4} className="mt-5">
              <div className="bl-dark-1 pl-3">
                <DList icon={<i class="bi bi-calendar4-week"></i>} name="Date" title={tip?.createdAt && DateTime(tip?.createdAt).stringFormat()} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

//
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
