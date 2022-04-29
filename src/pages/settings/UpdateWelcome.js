import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { EmjsF, objectRemove, toCapitalize } from "../../applocal";
import CountryList from "../../components/CountriesDropdown";
import LoadingAnim from "../../components/LoadingAnim";
import qs from "query-string";
import { toast } from "react-toastify";
import settingsAPI from "../../services/settingsAPI";

export default function ({ history, location }) {
  const [initVals, setInitVals] = React.useState({
    title: "",
    url: "",
    description: "",
    files: "",
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [is_init, setis_init] = useState(false);
  const [form] = Form.useForm();

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });

  async function getSettings() {
    const {
      data: { data: tipsData },
    } = await settingsAPI.getWelcomeMessage(paramData).catch(() => toast.error("unable to get Settings data"));
    setInitVals(tipsData);
    form.setFieldsValue(tipsData);
    setis_init(true);
  }

  const addNew = (vals) => {
    // vals.users = vals.users.map((v) => ({ userId: v }));
    // return console.log(vals)
    // editorState;
    vals.files = files;
    setLoading(true);
    const sd = paramData ? "update" : "add";

    if (!vals?.files) vals = objectRemove(vals, ["files"]);

    vals = { ...objectRemove(vals, ["title", "description"]), welcome_title: vals?.title, welcome_description: vals?.description };

    settingsAPI["addWelcomeMessage"](vals)
      .then((result) => {
        history.push("/");
        // console.log(result)
      })
      .finally(() => setLoading(false));
  };

  const onChangeFiles = (e) => {
    // console.log(e.target.files);
    setFiles(e.target.files[0]);
  };

  React.useEffect(() => {
    getSettings();
  }, []);
  if (!is_init) {
    return <LoadingAnim />;
  }

  return (
    <>
      <Form name="wrap" className="resize-450." labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew} initialValues={initVals}>
        <div className="shadow-sm p-3 row mt-md-5">
          <div className=" col-md-6">
            <Form.Item label="Welcome Title" className="text-right" name="title" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Welcome Description" className="text-right" name="description" rules={[{ required: true }]}>
              <Input.TextArea className="myinput" rows={5} />
            </Form.Item>
            <Form.Item label="Learn More Url" className="text-right" name="url" rules={[{ required: true }]}>
              <Input className="myinput" />
            </Form.Item>
            <Form.Item label="Welcome Image" className="text-right">
              <input name="files" type="file" onChange={onChangeFiles} accept="image/*" className="form-control myinput " />
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-4 offset-sm-4 btnupdate" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {paramData ? "Update" : "Update"} Welcome Message
              </Button>
            </Form.Item>
          </div>
          <div className="col-6"></div>
        </div>
      </Form>
    </>
  );
}
