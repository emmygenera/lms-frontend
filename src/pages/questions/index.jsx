import React,{useState} from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./questionindex.scss";

import { Row, Col } from "react-bootstrap";
import { Table } from "antd";
import { CustomPagination,Actions } from "../../components";
import qs from "query-string";

const columns = [
        {
            title: "ID",
            dataIndex: "id",
            filters: [
                {
                    text: "London",
                    value: "London",
                },
                {
                    text: "New York",
                    value: "New York",
                },
            ],
            onFilter: (value, record) => record.id.indexOf(value) === 0,
        },

        {
            title: "Open Date",
            dataIndex: "join_date",
            filters: [
                {
                    Number: "London",
                    value: "London",
                },
                {
                    text: "New York",
                    value: "New York",
                },
            ],
            onFilter: (value, record) => record.join_date.indexOf(value) === 0,
        },

        {
            title: "Client Name",
            dataIndex: "name",
            filters: [
                {
                    text: "Joe",
                    value: "Joe",
                },
                {
                    text: "Jim",
                    value: "Jim",
                },
                {
                    text: "Submenu",
                    value: "Submenu",
                    children: [
                        {
                            text: "Green",
                            value: "Green",
                        },
                        {
                            text: "Black",
                            value: "Black",
                        },
                    ],
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend"],
        },
        {
            title: "courses",
            dataIndex: "course",
            filters: [
                {
                    text: "London",
                    value: "London",
                },
                {
                    text: "New York",
                    value: "New York",
                },
            ],
            onFilter: (value, record) => record.course.indexOf(value) === 0,
        },
        {
            title: "Lesson",
            dataIndex: "lesson",
            filters: [
                {
                    text: "Active",
                    value: "Active",
                },
                {
                    text: "Active",
                    value: "Active",
                },
            ],
            onFilter: (value, record) => record.lesson.indexOf(value) === 0,
        },
        {
            title: "Subject",
            dataIndex: "subject",
        },
        {
            title: "Status",
            dataIndex: "status",
            filters: [
                {
                    text: "Active",
                    value: "Active",
                },
                {
                    text: "Active",
                    value: "Active",
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },

        {
            title: "Action",
            dataIndex: "action",
        },
    ];

    const data = [
        {
            key: "1",
            id: 1,
            join_date: 5,
            name: "John Brown",
            course: "The mern satck",

            status: "Active",

            lesson: "React",
            subject: "paid",
            action: <Actions />,
        },
    ];

const Questions = (props) => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    const [page, setPage] = useState(params.page || 1);
    const [pageSize, setPageSize] = useState(params.pageSize || 5);
    const [total, setTotal] = useState(0);
    
    return (
        <>
            <Row className="mt-4 p-2 ms-1" style={{ paddingTop: "50px" }}>
                <Col sm={12} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
                    <Row className="py-md-2">
                        <Col sm={7} md={8} className="hidediv" style={{ position: "relative" }}>
                            <i class="bi bi-person qsearchicon"></i>
                            <input id="qsearchinput" type="search" placeholder="Search here" />
                            <i class="bi bi-search" style={{ position: "absolute", left: "200px", top: "9px" }}></i>
                        </Col>
                        <Col sm={5} md={4} className="text-sm-end pe-2">
                            <button id="qbtndelete" style={{ float: "right" }}>
                                Delete
                            </button>
                            <button id="qbtnedit" style={{ float: "right" }}>
                                Edit
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="mt-3 p-4" style={{ backgroundColor: "white" }}>
                <Table columns={columns} dataSource={data} pagination={false} />
                <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
                
            </div>
        </>
    );
};

export default Questions;
