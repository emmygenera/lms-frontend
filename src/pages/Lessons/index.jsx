import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import "./lessonindex.scss";
import { Table } from "antd";
import { CustomPagination, Actions } from "../../components";
import qs from "query-string";
import PaginatedTable from "../../components/PaginatedTable";
import lesson from "../../services/lesson";
import moment from "moment";
import { toast } from 'react-toastify'
const columns = [
    {
        title: "Lesson ID",
        dataIndex: "id",
        width: "30%",
    },
    {
        title: "Date",
        dataIndex: "date",
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: "Lesson Name",
        dataIndex: "name",
        width: "40%",
    },
    {
        title: "Section",
        dataIndex: "section",
        width: "40%",
    },
    {
        title: "Type",
        dataIndex: "type",
        width: "40%",
    },
    {
        title: "Instructor",
        dataIndex: ['course', 'instructor', 'name'],
        width: "40%",
    },
    {
        title: "Order",
        dataIndex: "order",
        width: "40%",
    },
    {
        title: "Course Name",
        dataIndex: ["course", 'name'],
        width: "40%",
    },
    {
        title: "Actions",
        dataIndex: "actions",
    },
];

const Lessons = (props) => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    const [page, setPage] = useState(params.page || 1);
    const [pageSize, setPageSize] = useState(params.pageSize || 5);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [dataSource, setDataSource] = useState([]);

    const deleteCat = async (id) => {
        setDataSource((_data) => {
            const newData = [..._data.filter(({ _id }) => _id !== id)];
            return newData;
        });
        toast.success("Successfully deleted");
        return await lesson.deletelesson(id);
    };
    const updateCat = (data) => props.history.push(`/newLesson?data=${JSON.stringify(data)}`);
    const actions = (category) => <Actions component={category} deleteFun={deleteCat} updateFun={updateCat} />;

    useEffect(() => {
        props.history.push(`?page=${page}&pageSize=${pageSize}`);
        setLoading(true);
        lesson.getPaginated(page, pageSize).then(({ data: { lessons, total } }) => {
            setTotal(total);
            setDataSource([...lessons.map((lesson) => ({ ...lesson, date: moment(lesson.createdAt).format("L"), actions: actions(lesson) }))])
        }).finally(() => setLoading(false))
    }, [page, pageSize])

    return (
        <>
            <nav id="lessnav" class="ps-4 navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/login">
                        Home <span style={{ marginLeft: "10px" }}>/</span>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" to="login">
                                    Lessons <span style={{ marginLeft: "10px" }}>/</span>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="login">
                                    View Lessons
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <h5 className="mt-0">
                <b>[Course Name] Lessons</b>
            </h5>
            <div className="row  mt-6">
                <div className="col-sm-3 ">
                    <Link className="d-inline-flex linkbtn" to="newLesson" style={{ backgroundColor: "#F1F1F1" }}>
                        <i class="ps-2 bi bi-stack"></i>
                        <p className="ps-2">Add New Lesson</p>
                    </Link>
                </div>
                <div className="col-sm-8"></div>
            </div>

            <div className="p-2">
                <PaginatedTable
                    total={total}
                    page={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    columns={columns}
                    loading={loading}
                    data={dataSource}
                    setSelectedRowKeys={setSelectedRowKeys}
                    selectedRowKeys={selectedRowKeys}
                />
            </div>
        </>
    );
};

export default Lessons;
