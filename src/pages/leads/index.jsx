import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { toast } from 'react-toastify'
import "./leadindex.scss";
import { Table } from "antd";
import qs from "query-string";

import { CustomPagination, Actions } from "../../components";
import LeadService from "../../services/leads";
import PaginatedTable from "../../components/PaginatedTable";
import Lead from "../../services/leads";

// const data = [
//     {
//         id: "#0012451",
//         date: "04/08/2020",
//         name: "Clive shaw",
//         course: "Live Trading",
//         status: "New",

//         actions: <Actions />,
//     },
//     {
//         id: "#0012451",
//         date: "04/08/2020",
//         name: "Clive shaw",
//         course: "Live Trading",
//         status: "New",

//         actions: <Actions />,
//     },
// ];

const Leads = (props) => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    const [data, setDate] = useState([]);
    const [page, setPage] = useState(params.page || 1);
    const [pageSize, setPageSize] = useState(params.pageSize || 5);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dateFilters, setDateFilters] = useState([]);
    const [nameFilters, setNameFilters] = useState([]);
    const [statusFilters, setStatusFilters] = useState([]);
    const [phoneFilters, setPhoneFilters] = useState([]);
    const [search, setSearch] = useState(params.query || "");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        getData();
    }, [page, pageSize]);

    useEffect(() => {
        getData();
        setPage(1);
    }, [search]);

    const getData = () => {
        setLoading(true);
        props.history.push(`?page=${page}&pageSize=${pageSize}&query=${search}`);
        LeadService.getPaginated(page, pageSize, search || "")
            .then(({ data: { leads, total } }) => {
                if (leads.length === 0 && page > 1) return setPage(page - 1);
                setTotal(total);
                setDate(leads.map((lead, index) => ({ ...lead, date: moment(lead.createdAt).format("L"), actions: actions(lead), id: lead._id, index: index + 1, join_date: moment(lead.createdAt).format("L") })));
                // setDateFilters(leads.map(({ createdAt }) => ({ value: moment(createdAt).format("L"), text: moment(createdAt).format("L") })));
                // setNameFilters(leads.map(({ name }) => ({ value: name, text: name })));
                // setStatusFilters(leads.map(({ status }) => ({ value: status, text: status })));
                // setPhoneFilters(leads.map(({ phone }) => ({ value: phone, text: phone })));
            })
            .finally(() => setLoading(false));
    };

    const deleteCat = async (id) => {
        setDate((_data) => {
            const newData = [..._data.filter(({ _id }) => _id !== id)];
            return newData;
        });
        toast.success("Successfully deleted");
        return await LeadService.deleteinstructor(id);
    };

    const updateCat = (data) => props.history.push(`/newLead?data=${JSON.stringify(data)}`);

    const actions = (lead) => <Actions component={lead} deleteFun={deleteCat} updateFun={updateCat} />;

    const deleteAll = () => {
        setLoading(true)
        return new Promise((resolve, reject) => (
            Promise.all(selectedRowKeys.map(async id => await Lead.deleteinstructor(id)))).then(() => {
                getData()
                resolve("")
                setSelectedRowKeys([])
            })
        )
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Lead Name",
            dataIndex: "name",
        },
        {
            title: "Course",
            dataIndex: "course",
        },
        {
            title: "Status",
            dataIndex: "status",
            // filters: [
            //     {
            //         text: "London",
            //         value: "London",
            //     },
            //     {
            //         text: "New York",
            //         value: "New York",
            //     },
            // ],
            // onFilter: (value, record) => record.address.startsWith(value),
            // filterSearch: true,
            // width: "40%",
        },

        {
            title: "Actions",
            dataIndex: "actions",
        },
    ];

    return (
        <>
            <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
                <Col sm={3}>
                    <Link className="d-inline-flex llinkbtn" to="newLead" style={{ backgroundColor: "#F1F1F1" }}>
                        <p className=" px-3 py-md-2 px-md-4">+New Lead</p>
                    </Link>
                </Col>
                <Col sm={9} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
                    <Row className="py-md-2">
                        <Col sm={7} md={8} className="hidediv" style={{ position: "relative" }}>
                            <i class="bi bi-person lsearchicon"></i>
                            <input id="lsearchinput" type="search" placeholder="Search here" />
                            <i class="bi bi-search" style={{ position: "absolute", left: "200px", top: "9px" }}></i>
                        </Col>
                        <Col sm={5} md={4}>
                            <button id="qbtndelete" style={{ float: "right" }} onClick={deleteAll} disabled={selectedRowKeys.length === 0}>
                                Delete
                            </button>
                            <button id="qbtnedit" style={{ float: "right" }} >
                                Edit
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="mt-3 p-4">
                <PaginatedTable
                    total={total}
                    page={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    columns={columns}
                    loading={loading}
                    data={data}
                    setSelectedRowKeys={setSelectedRowKeys}
                    selectedRowKeys={selectedRowKeys}
                />
            </div>
        </>
    );
};

export default Leads;
