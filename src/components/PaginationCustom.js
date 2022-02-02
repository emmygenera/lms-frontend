import { Pagination } from "antd";
import React, { } from "react";

const CustomPagination = ({ total, page: _page, pageSize, setPage, setPageSize }) => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ borderRadius: "30px", border: "1px solid #0E7009", maxWidth: "300px" }}>
            <Pagination
                pageSize={pageSize}
                hideOnSinglePage={true}
                defaultCurrent={parseInt(_page)}
                total={total}
                onChange={(p, size) => { setPageSize(size); setPage(p) }}
                itemRender={(page, type) => {
                    const cond = page === parseInt(_page);
                    const style = { backgroundColor: "#0E7009", borderRadius: "30px", color: "white" };
                    return <div style={cond && type !== "next" ? style : { color: "#0E7009", fontSize: "18px", fontWeight: "500px" }}>{type === "page" ? page : type === "prev" ? <img src="/images/prev.png" /> : <img src="/images/next.png" />}</div>;
                }}
            />
        </div>
    </div>
);

export default CustomPagination;
