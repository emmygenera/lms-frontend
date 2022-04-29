import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import "./invoiceindex.scss";
import { Table } from "antd";
import qs from "query-string";

import { CustomPagination, Actions } from "../../components";
import PaginatedTable from "../../components/PaginatedTable";
import InvoiceAPI from "../../services/InvoiceAPI";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import APP_USER from "../../services/APP_USER";
import certificateAPI from "../../services/certificateAPI";
import { jsonValue } from "../../applocal";
import { BASE_URL } from "../../services/config.json";

const Certificates = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(params.query || "");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { userRl, user } = useSelector((s) => s.auth);
  const mgn = pmac(["admin", "manager", "instructors"]).includes(userRl);
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
    const gt = () => {
      //   console.log(userRl, user.id);
      switch (userRl) {
        case APP_USER.customer:
          return certificateAPI.getByUsers({ id: user?.id, pageNo: page, pageSize, search });
        default:
          return certificateAPI.getPaginated(page, pageSize, search || "");
      }
    };
    gt()
      .then(({ data: { data: leads, total } }) => {
        if (leads.length === 0 && page > 1) return setPage(page - 1);
        setTotal(total);
        setDate(
          leads.map((lead, index) => ({
            ...lead,
            name: lead?.username,
            //
            download: actions(lead),
            id: data.length + index + 1,
            index: index + 1,
            date: moment(lead.createdAt).format("L"),
          }))
        );
      })
      .finally(() => setLoading(false));
  };

  const jv = jsonValue;
  const actions = (lead) => (
    <a target={"_blank"} href={BASE_URL + jv(jv(lead?.certificate_file, null).get(0), "").get("url")} download className="btn btn-primary">
      Download
    </a>
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      onFilter: (value, record) => record.id.indexOf(value) === 0,
    },

    {
      title: "Name",
      dataIndex: "name",

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Certificate",
      dataIndex: "certificate",
      onFilter: (value, record) => record.join_date.indexOf(value) === 0,
    },
    {
      title: "Certificate Date",
      dataIndex: "date",
      onFilter: (value, record) => record.join_date.indexOf(value) === 0,
    },
    {
      title: "Download",
      dataIndex: "download",

      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    // mgn
    //   ? {
    //       title: "Action",
    //       dataIndex: "actions",
    //     }
    //   : {},
  ];

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        <Col sm={3}>
          {mgn && (
            <Link className="d-inline-flex llinkbtn" to="uploadCertificate" style={{ backgroundColor: "#F1F1F1" }}>
              <p className=" px-3 py-md-2 px-md-4">+Upload Certificate</p>
            </Link>
          )}
        </Col>
        <Col sm={9} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
          <Row className="py-md-2">
            <Col sm={7} md={8} className="hidediv" style={{ position: "relative" }}>
              <i class="bi bi-person lsearchicon"></i>
              <input id="lsearchinput" type="search" placeholder="Search here" />
              <i class="bi bi-search" style={{ position: "absolute", left: "200px", top: "9px" }}></i>
            </Col>
            {/* {mgn && (
              <Col sm={5} md={4}>
                <button id="qbtndelete" style={{ float: "right" }} onClick={deleteAll} disabled={selectedRowKeys.length === 0}>
                  Delete
                </button>
                <button id="qbtnedit" onClick={updateAll} style={{ float: "right" }}>
                  Update Status
                </button>
              </Col>
            )} */}
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4">
        <PaginatedTable total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} columns={columns} loading={loading} data={data} setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} />
      </div>
    </>
  );
};

export default Certificates;
