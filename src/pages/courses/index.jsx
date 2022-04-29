import React from "react";
import { Link } from "react-router-dom";
import "./courses.scss";
import Card from "./user/Card";
import { ProtectedRoute } from "../../components";
import { Row } from "react-bootstrap";
import cardImage from "./user/card.jpg";
import { Select } from "antd";
import { SixthPage } from "..";
const Courses = () => {
  const [all, setAll] = React.useState(false);
  const All = () => setAll(!all);

  return (
    <>
      <nav class="  navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="">
            Home <span style={{ marginLeft: "10px" }}>/</span>
          </Link>
          {/* {loading && <Spin style={{ position: "absolute", top: '50%' }} />} */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="">
                  Courses <span style={{ marginLeft: "10px" }}>/</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="">
                  View Courses
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h5 className="fw-bold pl-5">Courses List</h5>
      <div className="pl-5 m-0 resize-400">
        <div class="addmycourse1 input-group mb-3">
          <input type="text" class="form-control" placeholder="input search text" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button class="btn btn-success" type="button" id="button-addon2">
            Search
          </button>
        </div>
      </div>

      <div>
        <div className="d-flex flex-wrap mt-md-5 " style={{ width: "80%", marginLeft: "30px" }}>
          Category :
          <button className="categorylink" style={{ border: "none", backgroundColor: "transparent" }} onClick={All}>
            All
          </button>
          <Link className="categorylink" to="">
            Category 1
          </Link>
          <Link className="categorylink" to="">
            Category 2
          </Link>
          <Link className="categorylink" to="">
            Category 3
          </Link>
          <Link className="categorylink" to="">
            Category 4
          </Link>
          <Link className="categorylink" to="">
            Category 5
          </Link>
          <Link className="categorylink" to="">
            Category 6
          </Link>
          <Link className="categorylink" to="">
            Category 7
          </Link>
          <Link className="categorylink" to="">
            Category 8
          </Link>
          {all && (
            <>
              <Link className="categorylink" to="">
                Category 9
              </Link>
              <Link className="categorylink" to="">
                Category 10
              </Link>
              <Link className="categorylink" to="">
                Category 11
              </Link>
              <Link className="categorylink" to="">
                Category 12
              </Link>
              <Link className="categorylink" to="">
                Category 13
              </Link>{" "}
            </>
          )}
        </div>
        <div id="divdrop" className="dropdown float-end">
          <button id="btndrop" class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Expand
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
      </div>
      <div className="mt-3" style={{ marginLeft: "30px" }}>
        Filter By instructor:
        <Select placeholder="All">
          {[{ name: "Test", _id: "user1" }].map(({ name, _id }) => (
            <Select.Option value={_id}>{name}</Select.Option>
          ))}
        </Select>
        <span className="px-2 ">Rating:</span>
        <Select className="mx-2 me-3" placeholder="All">
          {[...Array(5)].map((item, i) => (
            <Select.Option value={i + 1}>{i + 1}</Select.Option>
          ))}
        </Select>
      </div>
      <Row className="container-fluid  mt-5">
        <Card data={{ name: "Microsoft ", description: "Try the new cross-platform PowerShell", image: { url: cardImage } }} />
        <Card data={{ name: "Corporation.", description: "Try the new cross-platform PowerShell", image: { url: cardImage } }} />
        <Card data={{ name: "Microsoft ", description: "Try the new cross-platform PowerShell", image: { url: cardImage } }} />
        <Card data={{ name: "Microsoft ", description: "Try the new cross-platform PowerShell", image: { url: cardImage } }} />
        <Card data={{ name: "Microsoft ", description: "Try the new cross-platform PowerShell", image: { url: cardImage } }} />
      </Row>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document" style={{ maxWidth: 700 }}>
          <div className="modal-content rad_4 overflow-hidden">
            <div className="modal-header" hidden>
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-0">
              {/* <SeventhPage /> */}
              {/* <LivePage /> */}
              <SixthPage />
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
    </>
  );
};

export default Courses;
