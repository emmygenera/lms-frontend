import { Form, Select, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "../../components/Content";
import LoadingAnim from "../../components/LoadingAnim";
import Ticket from "../../services/MessageAPI";
import qs from "query-string";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EmjsF, split, toCapitalize } from "../../applocal";
import APP_USER from "../../services/APP_USER";

export default function ReplyMessage({ location }) {
  // const data = [{ name: "", id: 1 }];
  const [selectData, setselectData] = useState([
    { name: "Message ID", value: "#" },
    // { name: "Priority", value: "High" },
    // { name: "Course", value: "Live Trading 101" },
    // { name: "Assigned To", value: "Mohammad Malek" },
    { name: "Status", value: "Opened" },
  ]);
  const [QuestionDetails, setQuestionDetails] = useState({});
  const [Tickets, setTickets] = useState([]);
  const [CloseTicket, setCloseQuestion] = useState(false);
  const [Fetching, setFetching] = useState(false);
  const [AddingAns, setAddingAns] = useState(false);
  const [FromTicket, setFromTicket] = useState("Customer");

  const { data: qid } = qs.parse(location.search);
  const { user, userRl } = useSelector((s) => s.auth);

  function getSingleQuestion(id) {
    setFetching(true);
    Ticket.getSingle(id)
      .then(({ data: { data } }) => {
        setCloseQuestion(String(data?.status).toLowerCase() == "closed");
        setQuestionDetails(data);
        setTickets(data?.replies);
        setselectData([
          { name: "Message ID", value: "#" + data?._id },
          { name: "Status", value: data?.status },
        ]);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  const magn = userRl !== APP_USER.customer;

  function onSubmit(values) {
    setAddingAns(true);

    Ticket.replyMessage(qid, {
      ...values,
      ...{
        // reply_fromId: magn ? "Management" : "Customer",
        reply_fromId: JSON.stringify({ userId: user?.id, userRole: userRl, user: user?.name || split(user?.email, "@") }),
        reply_toId: FromTicket,
      },
    })
      .then(({ data: { data } }) => {
        toast.success("Message added successfully!");
        setTickets(data?.replies);
        // console.log(data);
      })
      .finally(() => setAddingAns(false));
  }
  function onCloseTick() {
    const cres = window.confirm("Do you want to close this Message?");
    if (!cres) return false;

    Ticket.closeMessage(qid).then(() => {
      toast.success("Message closed!");
      setCloseQuestion(true);
    });
  }

  useEffect(() => {
    getSingleQuestion(qid);
  }, []);

  if (Fetching) {
    return <LoadingAnim />;
  }
  function scTo(top = 50) {
    window.scrollTo({ top });
  }
  function ItemLists({ title = "", value = "", _data = [] }) {
    return (
      <div className="d-flex align-items-center" style={{ marginLeft: "10px" }}>
        <span className="px-2 fw-bold ">{title}</span>
        <p className="p-2 m-0" style={{ border: 0, borderRadius: 30, backgroundColor: "#efebeb" }}>
          {value}
        </p>
        {/* <Select style={{ border: 0, borderRadius: 30, backgroundColor: "#efebeb" }} placeholder={value} 
        / *value={instructor} onChange={(e) => setInstructor(e)}* />
          {_data.map(({ name, id: _id }) => (
            <Select.Option value={_id}>{name}</Select.Option>
          ))}
        </Select> */}
      </div>
    );
  }

  return (
    <>
      <Content className="mt-5">
        <style jsx>{`
          .ant-select:not(.ant-select-customize-input) .ant-select-selector {
            border-radius: 30px;
          }
          .ant-select:not(.ant-select-customize-input) .ant-select-selector {
            background-color: silver;
            background-color: #efebeb;
            border: 0;
          }
          .ant-select-selection-placeholder {
            color: rgba(0, 0, 0, 1);
            font-size: 12px;
          }
        `}</style>
        <div className="d-flex flex-wrap">
          {selectData.map((item, idx) => (
            <ItemLists key={idx} title={item.name} value={item.value} />
          ))}
        </div>
        <Form name="wrap" onFinish={onSubmit} className="w-100 p-3 pr-5 mt-4" labelCol={{ flex: "130px" }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} layout="horizontal" /* initialValues={data} onValuesChange={_handleChange}*/>
          <div className="d-flex mb-2 align-items-center">
            <label className="pr-3 text-uppercase">Subject</label>
            <h4 className="p-2 m-0" style={{ border: 0, borderRadius: 3, backgroundColor: "#fafafa" }}>
              {QuestionDetails?.ticketDetails?.subject}
            </h4>
          </div>
          <div className="d-flex mb-5 align-items-center">
            <label className="pr-3 text-uppercase">Details</label>
            <p className="p-2 m-0" style={{ border: 0, borderRadius: 3, backgroundColor: "#fafafa" }}>
              {QuestionDetails?.ticketDetails?.description || QuestionDetails?.ticketDetails?.ticketDetails}
            </p>
          </div>
          {!CloseTicket && (
            <>
              <Form.Item name="reply_message" rules={[{ required: true }]}>
                <div className="d-flex">
                  <label className="pr-3 text-uppercase">Reply</label>
                  <Input.TextArea className="w-100 rad_5" rows={10} />
                </div>
              </Form.Item>
              <div className="row">
                <div className="col-1 p-0"></div>
                <div className="col-7 d-flex">
                  <button disabled={AddingAns} type="submit" className="mr-3 btn btn-primary">
                    {AddingAns ? "Adding Reply... " : "Reply"}
                  </button>
                  {/* {magn && ( */}
                  <button type="button" onClick={onCloseTick} className="btn btn-danger">
                    Close Message
                  </button>
                  {/* )} */}
                </div>
              </div>
            </>
          )}
        </Form>
      </Content>
      <div className="my-5 py-3">
        <h3>Message Replies</h3>
      </div>
      {Tickets.map((item) => {
        const { reply_message: answer, reply_fromId, reply_toId } = item;
        const { user, userId, userRole } = EmjsF(reply_fromId).parse();
        return (
          <Content>
            <div className="resize-800 p-3">
              <div className="d-flex align-items-center">
                <div className="">
                  <div className="avatar" style={{ backgroundColor: "#c4c4c4", borderRadius: 300, width: 50, height: 50 }}></div>
                </div>
                <div className="details pl-2">
                  <h3 className="fz-2 fw-bold m-0 p-0">{toCapitalize(String(user))}</h3>
                  <p className="m-0 p-0 fz-sm">{toCapitalize(userRole == APP_USER.customer ? "Customer" : userRole)}</p>
                  {/* <p className="m-0 p-0 fz-sm">{(reply_toId == "Customer" ? "Reply to " : "") + reply_toId}</p> */}
                </div>
              </div>
              <div className="resize-700 m-0">
                <h3 className="my-3 fz-4 pl-1">{answer}</h3>
                {!CloseTicket && (
                  <>
                    <div className="col-7 d-flex">
                      <button
                        onClick={() => {
                          scTo();
                          setFromTicket(user);
                        }}
                        type="button"
                        className="mr-3 btn btn-primary"
                      >
                        Reply
                      </button>
                      {/* {magn && ( */}
                      <button className="btn btn-danger" onClick={onCloseTick}>
                        Close Message
                      </button>
                      {/*  )} */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Content>
        );
      })}
    </>
  );
}
