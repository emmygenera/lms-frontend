import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import "./invoiceindex.scss";
import { Table } from "antd";
import qs from "query-string";

import { CustomPagination, Actions } from "../../components";
import LeadService from "../../services/leads";
import PaginatedTable from "../../components/PaginatedTable";
import InvoiceAPI from "../../services/InvoiceAPI";
import Courses from "../../services/courses";
import { useSelector } from "react-redux";
import { pmac } from "../../routing/indexRoutes";
import APP_USER from "../../services/APP_USER";
import InvoicePrint from "./newinvoice/InvoicePrint";
import { arrayObjectMerge, baseUrl, DateTime, jsonValue, nullNumber, objectRemove } from "../../applocal";
import orderService from "../../services/orders";

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

const Invoice = (props) => {
  const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [data, setDate] = useState([]);
  const [page, setPage] = useState(params.page || 1);
  const [invoiceVals, setInvoiceVals] = useState({
    values: {},
    total: 0,
    Courses: [],
    vIn: false,
  });
  const [pageSize, setPageSize] = useState(params.pageSize || 15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [vIn, setvIn] = useState(false);
  const [dateFilters, setDateFilters] = useState([]);
  const [nameFilters, setNameFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [phoneFilters, setPhoneFilters] = useState([]);
  const [search, setSearch] = useState(params.query || "");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { userRl, user } = useSelector((s) => s.auth);
  const mgn = pmac(["admin", "manager", "staff"]).includes(userRl);

  const [filters, setFilters] = useState({
    orderId: [],
    name: [],
    status: [],
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
    const gt = () => {
      // console.log(userRl, user.id);
      switch (userRl) {
        case APP_USER.customer:
          return orderService.myOrders({ id: user?.id, page, pageSize, search });
        default:
          return orderService.getPaginated(page, pageSize, search || "");
      }
    };
    gt()
      .then(({ data: { data: leads, total } }) => {
        //  console.log(leads);
        if (leads.length === 0 && page > 1) return setPage(page - 1);
        setTotal(total);
        leads.map((itm, index) => {
          _setFilter("name", { text: itm?.name, value: itm?.name });
          _setFilter("status", { text: itm?.paymentstatus, value: itm?.paymentstatus });
          _setFilter("orderId", { text: itm?.orderID, value: itm?.orderID });
        });

        setDate(
          leads.map((lead, index) => ({
            //

            ...lead,
            course: lead?.courseId?.name,
            date: moment(lead.createdAt).format("L"),
            actions: actions(lead),
            id: data.length + index + 1,
            index: index + 1,
            join_date: moment(lead.createdAt).format("L"),
          }))
        );
        setLoading((s) => false);
      })
      .finally(() => {
        //console.log("finanlly loaded", baseUrl("#/myCourses"));
        setLoading((s) => false);
      });
  };
  const deleteCat = async (id) => {
    toast.info("deleting...");
    await orderService.deleteorder(id).catch(() => toast.error("Invoice not deleted"));
    setDate((_data) => {
      const newData = [..._data.filter(({ _id }) => _id !== id)];
      return newData;
    });
    toast.success("Successfully deleted");
  };

  const updateCat = (data) => props.history.push(`/newInvoice?data=${data._id}`);
  const viewInvoice = (data) => printFrame(data);

  async function printFrame(data) {
    // toast.info("Getting invoice data... ");
    // const _data = [];
    const orderInfo = {};
    // const {
    //   data: { data: _data },
    // } = await InvoiceAPI.reciepts().catch(() => toast.error("unable to get Paid Orders List"));

    // const orderInfo = _data.filter((itm) => itm._id == data.orderId).reduce((l, r) => r, {});

    setInvoiceVals(() => ({
      values: objectRemove({ ...orderInfo, ...data }, "courses"),
      Courses: data?.courses,
      total: data?.total,
    }));

    // console.log(data?.courses);

    setTimeout(() => {
      window.frames[0].focus();
      window.frames[0].print();
    }, 500);
    return false;
  }

  const actions = (lead) => <Actions component={lead} showDel={mgn} showUpd={false} deleteFun={deleteCat} onView={viewInvoice} updateFun={updateCat} />;

  const deleteAll = () => {
    setLoading(true);
    toast.info("deleting...");
    return new Promise((resolve, reject) =>
      Promise.all(selectedRowKeys.map(async (id) => await orderService.deleteorder(id)))
        .then(() => {
          getData();
          resolve("");
          setDate((_data) => {
            const newData = [..._data.filter(({ _id }) => !selectedRowKeys.some((itm) => _id == itm?._id))];
            return newData;
          });
          setSelectedRowKeys([]);
          toast.success("Successfully deleted");
        })
        .catch((e) => reject(e))
        .catch(() => toast.error("Invoice not deleted"))
    );
  };
  const updateAll = () => {
    setLoading(true);
    return new Promise((resolve, reject) =>
      Promise.all(selectedRowKeys.map(async (id) => await InvoiceAPI.updateStatus(id))).then(() => {
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
      sorter: (value, record) => record.id,
    },

    {
      title: "Invoice Date",
      dataIndex: "join_date",
      sorter: (a, b) => {
        return nullNumber(String(b.join_date).replace("/"), DateTime(b.date).getTime());
      },
      sortDirections: ["descend"],
    },

    {
      title: "Client Name",
      dataIndex: "name",
      filters: filters.name,
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // sorter: (a, b) => b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Order ID#",
      dataIndex: "orderID",
      filters: filters.orderId,
      onFilter: (value, record) => record?.orderID?.includes(value),
      filterSearch: true,
    },
    {
      title: "Status",
      dataIndex: "paymentstatus",
      filters: filters.status,
      onFilter: (value, record) => record.paymentstatus.includes(value),
      filterSearch: true,
    },
    {
      title: "Total",
      dataIndex: "total",

      sorter: (record) => record.total,
    },
    // mgn
    //   ?
    {
      title: "Action",
      dataIndex: "actions",
    },
    // : {},
  ];

  return (
    <>
      <Row className="mt-4 ms-1" style={{ paddingTop: "50px" }}>
        <Col sm={3}>
          {/* {mgn && (
            <Link className="d-inline-flex llinkbtn" to="newInvoice" style={{ backgroundColor: "#F1F1F1" }}>
              <p className=" px-3 py-md-2 px-md-4">+New Invoice</p>
            </Link>
          )} */}
        </Col>
        <Col sm={9} className="shadow-sm col2" style={{ borderRadius: "1em" }}>
          <Row className="py-md-2">
            <Col sm={7} md={8} className="hidediv" style={{ position: "relative" }}>
              <i class="bi bi-person lsearchicon"></i>
              <input id="lsearchinput" type="search" placeholder="Search here" />
              <i class="bi bi-search" style={{ position: "absolute", left: "200px", top: "9px" }}></i>
            </Col>
            {mgn && (
              <Col sm={5} md={4}>
                <button id="qbtndelete" style={{ float: "right" }} onClick={deleteAll} disabled={selectedRowKeys.length === 0}>
                  Delete
                </button>
                {/* <button id="qbtnedit" onClick={updateAll} style={{ float: "right" }}>
                  Update Status
                </button> */}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <div className="mt-3 p-4">
        <PaginatedTable total={total} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} columns={columns} loading={loading} data={data} setSelectedRowKeys={setSelectedRowKeys} selectedRowKeys={selectedRowKeys} />
      </div>
      <InvoicePrint data={invoiceVals} />
    </>
  );
};

export default Invoice;
