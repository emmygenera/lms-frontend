import React from "react";
import { Popconfirm, Table } from "antd";

import { CustomPagination } from ".";


const PaginatedTable = ({ total, page, setPage, pageSize, setPageSize, columns, data, loading, selectedRowKeys, setSelectedRowKeys, canSelectRow = true }) => {
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys)
    }
    return (
        <>
            <Table
                className="mb-4"
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={loading}
                rowSelection={canSelectRow ? rowSelection : false}
                rowKey={(record) => record._id}
            />
            <CustomPagination
                total={total}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
            />
        </>
    )
};


export default PaginatedTable;