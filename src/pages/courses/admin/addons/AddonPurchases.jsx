import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
// import "./leadindex.scss";
import { Table } from "antd";
import qs from "query-string";

import { CustomPagination, Actions } from "../../../../components";

import PaginatedTable from "../../../../components/PaginatedTable";
import addonsAPI from "../../../../services/addonsAPI";

import { alphabetIndex, arrayObjectMerge, DateTime, nullNumber } from "../../../../applocal";
import leadStatus from "../../../leads/leadStatus.json";
import confirmDelete from "../../../functions/comfirmDelete";

export default function (props) {
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

  const [filters, setFilters] = useState({
    title: [],
    name: [],
    email: [],
    amount: [],
  });
  function _setFilter(key = filters, value = []) {
    setFilters((s) => ({ ...s, [key]: arrayObjectMerge(s[key], value, "value") }));
  }

  const getData = () => {
    setLoading(true);
    props.history.push(`?pageNo=${page}&pageSize=${pageSize}&query=${search}`);
    addonsAPI
      .getAddonPurchases(page, pageSize, search || "")
      .then(({ data: { data: leads, total } }) => {
        if (leads.length === 0 && page > 1) return setPage(page - 1);
        setTotal(total);
        leads.map((lead, index) => {
          _setFilter("title", [{ text: lead?.addonData?.title, value: lead?.addonData?.title }]);
          _setFilter("name", [{ text: lead?.userData?.name, value: lead?.userData?.name }]);
          _setFilter("email", [{ text: lead?.userData?.email, value: lead?.userData?.email }]);
          _setFilter("amount", [{ text: lead?.amount, value: lead?.amount }]);
        });
        setDate(
          leads.map((lead, index) => ({
            ...lead,
            title: lead?.addonData?.title,
            customer_name: lead?.userData?.name,
            customer_email: lead?.userData?.email,
            link: (
              <a href={lead?.link} style={{ maxWidth: 150, display: "block" }} target="_blank">
                {lead?.addonData?.link}
              </a>
            ),
            price: <span style={{ maxWidth: 150, whiteSpace: "nowrap", display: "block" }}>{lead?.amount}</span>,
            date: moment(lead.createdAt).format("L"),
            expire_at: moment(lead?.addonData?.expire_at).format("L"),
            actions: actions(lead),
            id: data.length + index + 1,
            index: index + 1,
          }))
        );
        // setDateFilters(leads.map(({ createdAt }) => ({ value: moment(createdAt).format("L"), text: moment(createdAt).format("L") })));
        // setNameFilters(leads.map(({ name }) => ({ value: name, text: name })));
        // setStatusFilters(leads.map(({ status }) => ({ value: status, text: status })));
        // setPhoneFilters(leads.map(({ phone }) => ({ value: phone, text: phone })));
      })
      .finally(() => setLoading(false));
  };

  const deleteCat = async (id) => {
    if (confirmDelete()) {
      setLoading(true);
      //   console.log(id);
      await addonsAPI.purchaseDelete({ id });
      setDate((_data) => {
        const newData = [..._data.filter(({ _id }) => _id !== id)];
        return newData;
      });
      setLoading(false);
      toast.success("Successfully deleted");
    }
  };

  const updateCat = (data) => props.history.push(`/newAddon?data=${data._id}`);

  const actions = (lead) => <Actions component={lead} deleteFun={deleteCat} />;

  const deleteAll = () => {
    if (confirmDelete()) {
      setLoading(true);
      return new Promise((resolve, reject) =>
        Promise.all(selectedRowKeys.map(async (id) => await addonsAPI.purchaseDelete({ id })))
          .then(() => {
            getData();
            resolve("");
            setSelectedRowKeys([]);
            toast.success("Successfully deleted");
          })
          .finally(() => {
            setLoading(false);
          })
      );
    }
  };

  const updateAll = () => {
    setLoading(true);
    return new Promise((resolve, reject) =>
      Promise.all(selectedRowKeys.map(async (id) => await addonsAPI.updateStatus(id))).then(() => {
        getData();
        resolve("");
        setSelectedRowKeys([]);
        toast.success("Status updated!");
      })
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => {
        return b.id;
      },
    },

    {
      title: "Addon Title",
      dataIndex: "title",
      filters: filters.title,
      onFilter: (value, record) => record.title.startsWith(value),
      filterSearch: true,
      sorter: (a, b) => {
        return alphabetIndex(String(b.name).charAt(0));
      },
      // sortDirections: ["descend"],
    },

    {
      title: "Customer Name",
      dataIndex: "customer_name",
      filters: filters.name,
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Customer Email",
      dataIndex: "customer_email",
      filters: filters.email,
      onFilter: (value, record) => record.email.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Link (url)",
      dataIndex: "link",
      filters: filters.link,
      onFilter: (value, record) => record.phone.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Amount",
      dataIndex: "price",
      filters: filters.amount,
      onFilter: (value, record) => record.price.startsWith(value),
      filterSearch: true,
      // width: "40%",
    },
    {
      title: "Expire Date",
      dataIndex: "expire_at",
      sorter: (a, b) => {
        return nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime());
      },
      sortDirections: ["descend"],
    },
    {
      title: "Create Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime());
      },
      sortDirections: ["descend"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  useEffect(() => {
    getData();
    setPage(1);
  }, [search]);

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        <Col sm={3}>
          {/* <Link className="d-inline-flex llinkbtn" to="newAddon" style={{ backgroundColor: "#F1F1F1" }}>
            <p className=" px-3 py-md-2 px-md-4">+New Addons</p>
          </Link> */}
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
              {/* <button id="qbtnedit" onClick={updateAll} style={{ float: "right" }}>
                Update Status
              </button> */}
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4">
        <PaginatedTable total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} columns={columns} loading={loading} data={data} setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} />
      </div>
    </>
  );
}
