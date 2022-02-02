import React from "react";
import { Link } from "react-router-dom";
import "./courses.scss";
import Card from "./Card.jsx";
import { ProtectedRoute } from "../../components";

const Courses = () => {
    const [all, setAll] = React.useState(false);
    const All = () => setAll(!all);

    return (
        <>
            <nav>
                <ul id="navul">
                    <li>
                        <Link to="" className="navlink">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="navlink">
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="navlink">
                            View Courses
                        </Link>
                    </li>
                </ul>
            </nav>
            <h5 className="fw-bold pl-5">Courses List</h5>
            <div>
                <input type="search" className="ml-5" placeholder="input search text" />
                <input type="submit" className="btn-success border-0" value="search" style={{ padding: "3px" }} />
                <span id="addcoursespan">
                    <i id="addcourseicon" class="bi bi-folder-plus"></i>
                    <Link id="addcourselink" to="">
                        Add New Course
                    </Link>
                </span>
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
                <select className="ms-2 me-3">
                    {[
                        ...Array(5).map((item, i) => (
                            <option value={i === 1 ? "All" : i} selected={i === 0}>
                                {i === 1 ? "All" : i}
                            </option>
                        )),
                    ]}
                </select>
                Rating:
                <select className="ms-2">
                    <select className="ms-2 me-3">
                        {[
                            ...Array(5).map((item, i) => (
                                <option value={i === 1 ? "All" : i} selected={i === 0}>
                                    {i === 1 ? "All" : i}
                                </option>
                            )),
                        ]}
                    </select>
                </select>
            </div>
            <Row className="container-fluid  mt-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Row>
        </>
    );
};

export default Courses;
