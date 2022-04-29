import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./tipindex.scss";
import Card from "./Card";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import TIpService from "../../services/TipService";
import qs from "query-string";
import { Spin } from "antd";
import { pmac } from "../../routing/indexRoutes";
import { useSelector } from "react-redux";
import ViewTips from "./ViewTips";

//

const Tips = ({ location, history }) => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewTip, setviewTip] = useState({});
  const [page, setPage] = useState(params.pageNo || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 5);
  const [search, setSearch] = useState(params.search || "");
  const [pageData, setPageData] = useState({ currentPage: 0, nextPage: params.pageNo || 1, previousPage: 0, total: 0, offsetBy: params.pageSize || 15, totalPages: 0 });
  const { userRl } = useSelector((s) => s.auth);
  const mgn = pmac(["admin", "manager", "marketing"]).includes(userRl);
  useEffect(() => {
    getTips();
  }, []);
  const getTips = () => {
    // setTips([]);

    history.push(`?pageNo=${pageData.nextPage}&pageSize=${pageData.offsetBy}&search=${search}`);

    TIpService.getPaginated({ page: pageData.nextPage, pageSize: pageData.offsetBy, query: search })
      .then(({ data: { nextPage = 0, offsetBy = 0, previousPage = 0, totalPages = 0, total = 0, data: tips } }) => {
        setTips(tips);
        setPageData((state) => ({ ...state, previousPage, nextPage, total, offsetBy: Number(offsetBy), totalPages: Number(totalPages) }));
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const delTip = (id) =>
    new Promise((resolve, reject) => {
      TIpService.deletetip(id)
        .then((result) => {})
        .catch((err) => {});
      setTimeout(() => {
        resolve(setTips([...tips.filter(({ _id }) => _id !== id)]));
      }, 200);
    });

  const isLoadmore = pageData.totalPages >= pageData.nextPage;
  const loadMore = getTips;
  function onViewTip(data) {
    setviewTip(data);
  }
  const modalRef = useRef(null);
  const onModalClose = (e) => {
    if (modalRef.current == e.target) {
      const frame = modalRef.current.querySelector("iframe");
      // console.log(frame.src);
      if (frame) frame.src = frame.src;
    }
  };

  return (
    <>
      <nav class=" ps-4 navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/login">
            Home<span style={{ marginLeft: "10px" }}>/</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="login">
                  Tips<span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" to="login">
                  View Tips
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h5 className="fw-bold ms-4 mt-1">Tips List</h5>
      <Row className="ms-3">
        <Col xs={5}>
          <div class="addmycourse1 input-group mb-3">
            <input type="text" class="form-control" placeholder="input search text" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button class="btn btn-success" type="button" id="button-addon2">
              Search
            </button>
          </div>
        </Col>
        {mgn && (
          <Col xs={3} className="offset-4">
            <Row>
              <Col xs={2}></Col>
              <Col xs={10}>
                <Link className="" to="newTip">
                  <p className="addmycourse" style={{ backgroundColor: "#F1F1F1" }}>
                    +Add New Tip
                  </p>
                </Link>
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      <div className="row mt-5" style={{ backgroundColor: "white" }}>
        {tips.map((tip) => (
          <Card tip={tip} delTip={delTip} onViewTip={onViewTip} isManagement={mgn} />
        ))}
        <div className="col-12">
          <div className="d-flex justify-content-center" style={{ padding: 10 }}>
            {loading && <Spin />}
            {isLoadmore && !loading && (
              <span className="text-center d-block">
                <button onClick={loadMore} className="btn shadow p-3" style={{ borderRadius: 300, fontSize: 16 }}>
                  &darr;
                  <i className="fa fa-bi-arrow-bar-down"></i>
                </button>
                <span className="d-block text-capitalize">View More</span>
              </span>
            )}
          </div>

          <div className="modal fade" ref={modalRef} onClick={onModalClose} id="tipModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document" style={{ maxWidth: 700 }}>
              <div className="modal-content rad_4 overflow-hidden">
                {/* <div className="modal-header" hidden>
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
                <div className="modal-body p-0">
                  {/* <SeventhPage /> */}
                  {/* <LivePage /> */}
                  {viewTip?._id && <ViewTips data={viewTip} />}
                </div>
                {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tips;
