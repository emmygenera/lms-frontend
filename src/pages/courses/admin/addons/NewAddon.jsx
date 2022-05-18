import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { EmjsF, objectRemove, toCapitalize } from "../../../../applocal";
import LoadingAnim from "../../../../components/LoadingAnim";
import qs from "query-string";
import { toast } from "react-toastify";
import addonsAPI from "../../../../services/addonsAPI";

export default function ({ history, location }) {
  const [initVals, setInitVals] = React.useState({
    title: "",
    url: "",
    description: "",
    // price: { usd: "", jod: "" },
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [is_init, setis_init] = useState(false);
  const [form] = Form.useForm();

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });
  console.log({ paramData });
  async function getAddons() {
    const {
      data: { data: tipsData },
    } = await addonsAPI.getSingle(paramData).catch(() => toast.error("unable to get Addons data"));
    setInitVals(tipsData);
    form.setFieldsValue(objectRemove(tipsData, ["price"]));
    try {
      const { usd, jod } = tipsData.price;
      form.setFieldsValue({ usd, jod });
    } catch (error) {
      console.log(error);
    }
    setis_init(true);
  }

  const addNew = (vals) => {
    setLoading(true);
    const sd = paramData ? "update" : "add";

    vals = { ...objectRemove(vals, ["usd", "jod"]), price: { usd: vals?.usd, jod: vals?.jod } };

    addonsAPI[sd]({ data: vals, id: paramData })
      .then((result) => {
        history.push("/addons");
        // console.log(result)
      })
      .finally(() => setLoading(false));
  };

  const onChangeFiles = (e) => {
    // console.log(e.target.files);
    setFiles(e.target.files[0]);
  };

  React.useEffect(() => {
    if (paramData) getAddons();
  }, []);

  if (!is_init) {
    return <LoadingAnim />;
  }

  return (
    <>
      <Form form={form} name="wrap" className="resize-450." labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew} initialValues={initVals}>
        <div className="shadow-sm p-3 row mt-md-5">
          <div className=" col-md-6">
            <Form.Item label="Title" className="text-right" name="title" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Link" className="text-right" name="link" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Description" className="text-right" name="description" rules={[{ required: false }]}>
              <Input.TextArea className="myinput" rows={5} />
            </Form.Item>
            <div className="d-flex">
              <div className="col-3">
                <label htmlFor="">
                  <b style={{ color: "red" }}>*</b> Price
                </label>
              </div>
              <div className="col-9">
                <div className="d-flex">
                  <Form.Item label="USD" className="text-right" name="usd" rules={[{ required: true }]}>
                    <Input className="myinput" />
                  </Form.Item>
                  <Form.Item label="JOD" className="text-right" name="jod" rules={[{ required: true }]}>
                    <Input className="myinput" />
                  </Form.Item>
                </div>
              </div>
            </div>
            <Form.Item label="Date Expire" className="text-right" name="expire_at" rules={[{ required: true }]}>
              <Input className="myinput" type="date" />
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-4 offset-sm-4 btnupdate" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {paramData ? "Update" : "New"} Addon
              </Button>
            </Form.Item>
          </div>
          <div className="col-6"></div>
        </div>
      </Form>
    </>
  );
}
