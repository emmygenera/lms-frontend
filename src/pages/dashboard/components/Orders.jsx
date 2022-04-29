import React from "react";
import { Table } from "antd";
import LinkDown from "./LinkDown";

export default function Orders({ data, loading }) {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]); // Check here to configure the default column;

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
    },
    {
      title: "Date",
      dataIndex: "join_date",
    },
    {
      title: "Customer Name	",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];

  return (
    <div className="bg-white cs-table-style outline-shadow p-4 mt-4">
      <Table className="mb-4" loading={loading} columns={columns} dataSource={data} pagination={false} rowSelection={false} />
      <LinkDown href={"orders"} />
    </div>
  );
}
