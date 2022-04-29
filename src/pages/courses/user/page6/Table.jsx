import React from "react";
import { Table } from "antd";
const _columns = [
  {
    title: "Lesson Name",
    dataIndex: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Course Section",
    dataIndex: "section",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
];
const Tables = ({ data: courseList = [], columns = _columns, loading }) => {
  const data = [
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
    {
      name: "#0012451",
      date: "04/08/2020",
      courses: "Elisabeth Queen",
    },
  ];
  // console.log(courseList);
  return (
    <div className="col-sm-12 col-md-12 rad-8 p-0">
      <Table columns={columns} loading={loading} className="rad-8" dataSource={courseList} pagination={false} />
    </div>
  );
};

export default Tables;
