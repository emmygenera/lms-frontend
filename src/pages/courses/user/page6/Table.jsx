import React from "react";
import { Table } from "antd";
const Tables = () => {
    const columns = [
        {
            title: "Lesson Name",
            dataIndex: "name",
        },
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Courses",
            dataIndex: "courses",
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend"],
        },
    ];

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
    return (
        <div className="col-sm-10 col-md-7">
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default Tables;
