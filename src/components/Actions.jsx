import { Popconfirm, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Actions = ({ component, deleteFun, updateFun }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="d-inline-flex ">
        {/* <Button icon={<i class="bi bi-eye text-secondary"></i>} /> */}
        {updateFun && <Button icon={<i class="bi bi-pencil text-secondary p-1"></i>} onClick={() => updateFun(component)} />}
        <Popconfirm
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Confirm Delete"
          onConfirm={async () => await deleteFun(component._id)}
        >
          <Button icon={<i class="bi bi-trash text-secondary" />} onClick={() => setVisible(true)} />
        </Popconfirm>
      </div>
    </>
  );
};

export default Actions;
