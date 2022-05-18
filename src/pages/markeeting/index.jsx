import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import "./markeetindex.scss";
import qs from "query-string";

import { CustomPagination, Actions } from "../../components";
import MarketingService from "../../services/marketingService";
import PaginatedTable from "../../components/PaginatedTable";
import Lead from "../../services/leads";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import { arrayObjectMerge, DateTime, nullNumber } from "../../applocal";
import { Popconfirm } from "antd";
import confirmDelete from "../functions/comfirmDelete";

const Marketing = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dateFilters, setDateFilters] = useState([]);
  const [nameFilters, setNameFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [phoneFilters, setPhoneFilters] = useState([]);
  const [search, setSearch] = useState(params.query || "");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { userRl } = useSelector((state) => state.auth);
  const mgn = pmac(["admin", "manager", "marketing"]).includes(userRl);

  const [filters, setFilters] = useState({
    name: [],
    list_name: [],
    status: [],
    courses: [],
  });
  function _setFilter(key = filters, value = {}) {
    setFilters((s) => ({ ...s, [key]: arrayObjectMerge(s[key], [value], "value") }));
  }

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  useEffect(() => {
    getData();
    setPage(1);
  }, [search]);

  const getData = () => {
    setLoading(true);
    props.history.push(`?pageNo=${page}&pageSize=${pageSize}&query=${search}`);
    MarketingService.getPaginated(page, pageSize, search || "")
      .then(({ data: { data: leads, total } }) => {
        if (leads.length === 0 && page > 1) return setPage(page - 1);
        setTotal(total);
        leads.map((itm, index) => {
          _setFilter("name", { text: itm?.name, value: itm?.name });
          _setFilter("status", { text: itm?.status, value: itm?.status });
          _setFilter("list_name", { text: itm?.list_name, value: itm?.list_name });
        });
        setDate(leads.map((lead, index) => ({ ...lead, date: moment(lead.createdAt).format("L"), actions: actions(lead), id: index + 1, index: index + 1, join_date: moment(lead.createdAt).format("L") })));
        // setDateFilters(leads.map(({ createdAt }) => ({ value: moment(createdAt).format("L"), text: moment(createdAt).format("L") })));
        // setNameFilters(leads.map(({ name }) => ({ value: name, text: name })));
        // setStatusFilters(leads.map(({ status }) => ({ value: status, text: status })));
        // setPhoneFilters(leads.map(({ phone }) => ({ value: phone, text: phone })));
      })
      .finally(() => setLoading(false));
  };

  const deleteCat = async (id) => {
    if (confirmDelete()) {
      setDate((_data) => {
        const newData = [..._data.filter(({ _id }) => _id !== id)];
        return newData;
      });
      await MarketingService.delete(id);
      toast.success("Successfully deleted");
    }
  };

  const updateCat = (data) => props.history.push(`/newCampaign?data=${data._id}`);
  function updateDT(id, status) {
    getData(data.map((itm) => (itm?._id == id ? { ...itm, status } : itm)));
  }

  function mktservices({ id, data = { status: "hold" }, successMsg = "Status updated! Stopped." }) {
    toast.info("Updating status...");

    MarketingService.updateStatus({ id, data })
      .then(() => {
        updateDT(id, data.status);
        toast.success(successMsg);
      })
      .catch(() => {
        toast.error("Status update... Failed!");
      });
  }
  const stopEmailSending = (data) => {
    mktservices({ id: data?._id });
  };

  const startEmailSending = async (data) => {
    mktservices({ id: data?._id, data: { status: "pending" }, successMsg: "Status updated!" });
  };
  const actions = (lead) => (
    <>
      <button id="qbtnedit" className="btn btn-primary" onClick={() => startEmailSending(lead)}>
        Send Now
      </button>
      <button id="qbtndelete" className="mr-2" onClick={() => stopEmailSending(lead)}>
        Stop
      </button>
      <Actions component={lead} deleteFun={deleteCat} updateFun={updateCat} />
    </>
  );

  const deleteAll = () => {
    setLoading(true);
    return new Promise((resolve, reject) =>
      Promise.all(selectedRowKeys.map(async (id) => await MarketingService.delete(id))).then(() => {
        getData();
        resolve("");
        setSelectedRowKeys([]);
      })
    );
  };
  const updateStatus = () => {
    setLoading(true);
    return new Promise((resolve, reject) =>
      Promise.all(selectedRowKeys.map(async (id) => await MarketingService.updateStatus({ id }))).then(() => {
        getData();
        resolve("");
        setSelectedRowKeys([]);
        toast.success("Campaign status updated...");
      })
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (value, record) => record.id,
      sortDirections: ["descend"],
    },

    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime());
      },
    },

    {
      title: "Campaign Name",
      dataIndex: "name",
      filters: filters.name,
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    ...(mgn
      ? [
          {
            title: "List name",
            dataIndex: "list_name",
            filters: filters.list_name,
            onFilter: (value, record) => record.list_name.includes(value),
            filterSearch: true,
          },
          {
            title: "Status",
            dataIndex: "status",
            filters: filters.status,
            onFilter: (value, record) => record.status.includes(value),
            filterSearch: true,
          },
          {
            title: "Actions",
            dataIndex: "actions",
          },
        ]
      : [
          {
            title: "Description",
            dataIndex: "description",
            onFilter: (value, record) => record.status.indexOf(value) === 0,
          },
        ]),
  ];

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        {mgn && (
          <>
            <Col sm={3}>
              <Link className="d-inline-flex llinkbtn" to="newCampaign" style={{ backgroundColor: "#F1F1F1" }}>
                <p className=" px-3 py-md-2 px-md-4">+New Campaign</p>
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
                  <Popconfirm title="Confirm Delete" onConfirm={deleteAll}>
                    <button id="qbtndelete" style={{ float: "right" }} disabled={selectedRowKeys.length === 0}>
                      Delete
                    </button>
                  </Popconfirm>

                  {/* <button id="qbtnedit" onClick={updateStatus} style={{ float: "right" }} disabled={selectedRowKeys.length === 0}>
                    Active
                  </button> */}
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
      <div className="mt-3 p-4">
        <PaginatedTable total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} columns={columns} loading={loading} data={data} setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} />
      </div>
    </>
  );
};

export default Marketing;
