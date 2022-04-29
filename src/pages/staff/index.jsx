import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./staffindex.scss";

import { Row, Col } from "react-bootstrap";
import { Popconfirm, Table } from "antd";

import { CustomPagination, Actions } from "../../components";
import { Input } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";

import moment from "moment";
import qs from "query-string";
import { toast } from "react-toastify";
import stafs from "../../services/staff";
import PaginatedTable from "../../components/PaginatedTable";
import { DateTime, nullNumber } from "../../applocal";
import filterState from "../components/filterState";

const Staff = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [pageSize, setPageSize] = useState(params.pageSize || 15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [nameFilters, setNameFilters] = useState([]);
  const [roleFilters, setRoleFilters] = useState([]);
  const [setSelectedRowKeys, selectedRowKeys] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [search, setSearch] = useState(params.query || "");

  const deleteStaff = async (id) => {
    setDate((_data) => {
      const newData = [..._data.filter(({ _id }) => _id !== id)];
      return newData;
    });
    toast.success("Successfully deleted");
    return await stafs.deleteStaff(id);
  };

  const updateStaff = (staff) => props.history.push(`/newStaff?data=${staff}`);

  const actions = (staff) => <Actions component={staff} deleteFun={() => deleteStaff(staff._id)} updateFun={() => updateStaff(staff._id)} />;
  useEffect(() => {
    getData();
  }, [page, pageSize]);

  useEffect(() => {
    getData();
    setPage(1);
  }, [search]);

  const { filters, _setFilter } = filterState({ name: [], email: [], status: [], phone: [] }, useState);

  const getData = () => {
    setLoading(true);
    props.history.push(`?page=${page}&pageSize=${pageSize}&query=${search}`);
    stafs
      .getPaginated(page, pageSize, search)
      .then(({ data: { data: staffs, total } }) => {
        setTotal(total);

        staffs.map((itm, index) => {
          _setFilter("name", { text: itm?.name, value: itm?.name });
          const sts = itm.status == 1 ? "Active" : "DeActive";
          _setFilter("status", { text: sts, value: sts });
          _setFilter("email", { text: itm?.email, value: itm?.email });
          _setFilter("phone", { text: itm?.phone, value: itm?.phone });
        });

        setDate(staffs.map((staff, index) => ({ ...staff, status: staff?.status == 1 ? "Active" : "DeActive", index: index + 1, actions: actions(staff), date: moment(staff.createdAt).format("L") })));
        setNameFilters(staffs.map(({ name }) => ({ value: name, text: name })));
        setRoleFilters(staffs.map(({ roleName }) => ({ value: roleName, text: roleName })));
        setStatusFilters(staffs.map(({ status }) => ({ value: status, text: status })));
      })
      .finally(() => setLoading(false));
  };
  const deleteAll = async () => {
    Promise.all(selectedRowKeys.map((_id) => stafs.deleteStaff(_id))).then(() => {
      toast.success("Successfully deleted");
      setSelectedRowKeys([]);
    });
  };
  const columns = [
    {
      title: "Inst. Id",
      dataIndex: "_id",
    },

    {
      title: "Join Date",
      dataIndex: "date",
      sorter: (a, b) => {
        return nullNumber(String(b.date).replace("/"), DateTime(b.date).getTime());
      },
      sortDirections: ["descend"],
    },

    {
      title: "Staff Name",
      dataIndex: "name",
      filters: filters.name,
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },
    {
      title: "Role",
      dataIndex: "roleName",
      filters: [
        { value: "admin", text: "Admin" },
        { value: "finance", text: "Finance/Billing" },
        { value: "manager", text: "Manager" },
        { value: "marketing", text: "Marketing" },
        { value: "staff", text: "Staff" },
        { value: "support", text: "Support" },
      ],
      onFilter: (value, record) => {
        return String(record?.roleName).startsWith(value);
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      filters: filters.phone,
      onFilter: (value, record) => record.phone.includes(value),
      filterSearch: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: filters.email,
      onFilter: (value, record) => record.email.includes(value),
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
      title: "Action",
      dataIndex: "actions",
    },
  ];

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        <Col sm={3}>
          <Link className="d-inline-flex slinkbtn" to="newStaff" style={{ backgroundColor: "#F1F1F1" }}>
            <p className=" px-2 py-md-2 px-md-4">+New Staff Member</p>
          </Link>
        </Col>
        <Col sm={9} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
          <Row className="py-md-2">
            <Col sm={6} md={7} className="hidediv" style={{ position: "relative" }}>
              <Input id={""} style={{ borderRadius: "20px" }} size="large" placeholder="Search here" prefix={<UserOutlined />} suffix={<SearchOutlined />} value={search} onChange={(e) => setSearch(e.target.value)} />
            </Col>
            <Col sm={6} md={5}>
              <Popconfirm title="Confirm Delete" onConfirm={deleteAll}>
                <button id="sbtndelete" disabled={selectedRowKeys.length} style={{ float: "right" }}>
                  Delete
                </button>
              </Popconfirm>

              {/* <button id="sbtnedit" style={{ float: "right" }}>
                Edit
              </button> */}
              {/* <button id="sbtnactive" disabled style={{ float: "right" }}>
                <h6 id="cicon" style={{ display: "inline", marginRight: "2px" }}>
                  <i class="bi bi-check2-square" style={{ color: "green" }}></i>
                </h6>
                Active
              </button> */}
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4" style={{ backgroundColor: "white" }}>
        <PaginatedTable total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} columns={columns} loading={loading} data={data} setSelectedRowKeys={setSelectedRowKeys} canSelectRow={false} selectedRowKeys={selectedRowKeys} />
        {/* <Table columns={columns} dataSource={data} pagination={false} />
                <CustomPagination total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} /> */}
      </div>
    </>
  );
};

export default Staff;
