import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { baseUrl, toCapitalize } from "../../../applocal";
import CountryList from "../../../components/CountriesDropdown";
import LoadingAnim from "../../../components/LoadingAnim";
import Lead from "../../../services/leads";
import qs from "query-string";
import { toast } from "react-toastify";
import Courses from "../../../services/courses";

const ImportLeads = ({ history, location }) => {
  const [initVals, setInitVals] = React.useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    address: "",
    course: "",
    notes: "",
  });
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [is_init, setis_init] = useState(false);

  const { data: paramData } = qs.parse(location?.search, { parseFragmentIdentifier: true });

  async function getLeadsData() {
    const {
      data: { data: tipsData },
    } = await Lead.getSingle(paramData).catch(() => toast.error("unable to get Leads data"));
    setInitVals(tipsData);
    setis_init(true);
  }
  async function getCourses() {
    const {
      data: { data: tipsData },
    } = await Courses.getAll(paramData).catch(() => toast.error("unable to get Leads data"));
    setCourses(tipsData);
  }

  const addNew = (vals) => {
    setLoading(true);
    Lead.importCSV({ data: { file: files }, id: paramData })
      .then((result) => {
        history.push("/leads");
        // console.log(result)
      })
      .finally(() => setLoading(false));
  };
  React.useEffect(() => {
    if (!paramData) {
      setis_init(true);
    } else getLeadsData();
    getCourses();
  }, []);
  if (!is_init) {
    return <LoadingAnim />;
  }
  const onChangeFiles = (e) => {
    // console.log(e.target.files);
    setFiles(e.target.files[0]);
  };
  return (
    <>
      <div className="shadow-sm p-3 row mt-md-5">
        <div className=" col-md-7">
          <h5 className="offset-sm-3 mb-3 mt-5">
            <b>Lead Importation</b>
          </h5>
          <style jsx>
            {`
              .ant-form-item-label.ant-form-item-label-left {
                text-align: right;
              }
            `}
          </style>
          <Form name="wrap" className="resize-450" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" onFinish={addNew} initialValues={initVals}>
            <Form.Item label="Import CSV" name="notes" rules={[{ required: false }]}>
              <input name="files" type="file" onChange={onChangeFiles} accept="text/csv" className="form-control myinput " />
            </Form.Item>
            <Form.Item>
              <Button className="mt-2 col-4 offset-sm-4 btnupdate" type="primary" danger backgroundColor={"red"} htmlType="submit" loading={loading} id="mybtnupdate">
                {"Import Leads"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-5">
          <a href={baseUrl("employees.csv")} download target="_blank" rel="noopener noreferrer" className="btn btn-info">
            Download Sample
          </a>
        </div>
      </div>
    </>
  );
};

export default ImportLeads;
