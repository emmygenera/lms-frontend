import React,{ useState} from "react";
import { Link } from "react-router-dom";
import { Pagination, Table } from "antd";
import "./invoiceindex.scss";
import qs from "query-string";


import { CustomPagination,Actions } from "../../components";

import { Row, Col } from "react-bootstrap";

const Invoices = (props) => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    const [page, setPage] = useState(params.page || 1);
    const [pageSize, setPageSize] = useState(params.pageSize || 5);
    const [total, setTotal] = useState(0);
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
            title: "Invoice Date",
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
            title: "Order#",
            dataIndex: "order",
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
            onFilter: (value, record) => record.order.indexOf(value) === 0,
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
            title: "Total",
            dataIndex: "total",
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
            onFilter: (value, record) => record.total.indexOf(value) === 0,
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
            order: "The mern satck",

            status: "Active",
            total: "123",
            action:<Actions />
        },
        {
            key: "2",
            id: 2,
            join_date: 5,
            name: "Jim Green",
            order: "The mern satck",

            status: "Active",
            total: "123",
            action: <Actions />
        },
        
        
    ];

    return (
        <>
            <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
                <Col sm={3}>
                    <Link className="d-inline-flex vlinkbtn" to="newLesson" style={{ backgroundColor: "#F1F1F1" }}>
                        <p className=" px-2 py-md-2 px-md-4">+New Manual Payment</p>
                    </Link>
                </Col>
                <Col sm={9} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
                    <Row className="py-md-2">
                        <Col sm={7} md={8} className="hidediv" style={{ position: "relative" }}>
                            <i class="bi bi-person vsearchicon"></i>
                            <input id="vsearchinput" type="search" placeholder="Search here" />
                            <i class="bi bi-search" style={{ position: "absolute", left: "200px", top: "9px" }}></i>
                        </Col>
                        <Col sm={5} md={4}>
                            <button id="vbtndelete" style={{ float: "right" }}>
                                Delete
                            </button>
                            <button id="vbtnedit" style={{ float: "right" }}>
                                Edit
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="mt-3 p-4">
                <Table columns={columns} dataSource={data} pagination={false} />
                <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
                
            </div>
        </>
    );
};

export default Invoices;
