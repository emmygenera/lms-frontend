import React from "react";
import { Form, Input, Select } from "antd";

export default function Forms({ initialValues, formfiles, ...otherprops }) {
  const [form] = Form.useForm();

  return (
    <Form initialValues={initialValues} {...otherprops}>
      {formfiles(form)}
    </Form>
  );
}
