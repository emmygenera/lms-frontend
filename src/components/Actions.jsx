import { Popconfirm, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Actions = ({ showDel = true, showUpd = true, component, childELement, onRespond, onView, deleteFun, updateFun }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="d-inline-flex ">
        {childELement}
        {onView && <Button onClick={() => onView(component)} icon={<i class="bi bi-eye text-secondary"></i>} />}
        {onRespond && <Button onClick={onRespond} icon={<i class="bi bi-reply text-secondary"></i>} />}
        {showUpd && updateFun && <Button icon={<i class="bi bi-pencil text-secondary p-1"></i>} onClick={() => updateFun(component)} />}
        {showDel && (
          <Popconfirm visible={visible} onCancel={() => setVisible(false)} title="Confirm Delete" onConfirm={async () => await deleteFun(component._id)}>
            <Button icon={<i class="bi bi-trash text-secondary" />} onClick={() => setVisible(true)} />
          </Popconfirm>
        )}
      </div>
    </>
  );
};

export default Actions;
