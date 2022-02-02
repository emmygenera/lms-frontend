import React,{useState} from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./messageindex.scss";

import { Table } from "antd";
import { CustomPagination ,Actions} from "../../components";
import qs from "query-string";

import { Row, Col } from "react-bootstrap";

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        filters: [
            {
                text: "Joe",
                value: "Joe",
            },
            {
                text: "Category 1",
                value: "Category 1",
                children: [
                    {
                        text: "Yellow",
                        value: "Yellow",
                    },
                    {
                        text: "Pink",
                        value: "Pink",
                    },
                ],
            },
            {
                text: "Category 2",
                value: "Category 2",
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
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.name.includes(value),
        width: "30%",
    },
    {
        title: "Creation Date",
        dataIndex: "date",
        filters: [
            {
                text: "Joe",
                value: "Joe",
            },
            {
                text: "Category 1",
                value: "Category 1",
                children: [
                    {
                        text: "Yellow",
                        value: "Yellow",
                    },
                    {
                        text: "Pink",
                        value: "Pink",
                    },
                ],
            },
            {
                text: "Category 2",
                value: "Category 2",
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
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.name.includes(value),
        width: "30%",
    },
    {
        title: "Name",
        dataIndex: "name",
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
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: "40%",
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
                text: "London",
                value: "London",
            },
            {
                text: "New York",
                value: "New York",
            },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: "40%",
    },
    {
        title: "User Type",
        dataIndex: "usertype",
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
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: "40%",
    },
    {
        title: "Actions",
        dataIndex: "actions",
    },
];

const data =[
     {
        id: "#0012451",
        date: "04/08/2020",
        name: "Cive Slauw",
        subject: "Cive Slauw",
        status: "replied",
        usertype: "Customer",
        actions: <Actions />,
    },
];
const Messages = (props) => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });

    const [page, setPage] = useState(params.page || 1);
    const [pageSize, setPageSize] = useState(params.pageSize || 5);
    const [total, setTotal] = useState(0);

    return (
        <>
            <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
                <Col sm={3}>
                    <Link className="d-inline-flex mlinkbtn" to="newLesson" style={{ backgroundColor: "#F1F1F1" }}>
                        <p className=" px-3 py-md-2 px-md-4">+New Message</p>
                    </Link>
                </Col>
                <Col sm={9} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
                    <Row className="py-md-2">
                        <Col sm={7} md={8} className="hidediv" style={{ position: "relative" }}>
                            <i class="bi bi-person msearchicon"></i>
                            <input id="msearchinput" type="search" placeholder="Search here" />
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
            <div className="mt-3 p-4" style={{ backgroundColor: "white" }}>
                <Table columns={columns} dataSource={data} pagination={false} />
                <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
                
            </div>
        </>
    );
};

export default Messages;
