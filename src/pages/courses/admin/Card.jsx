import React, { useState } from "react";
import card from "./card.jpg";
import "./admincourses.scss";
import { Col } from "react-bootstrap";
import { Typography, Slider, Popconfirm, Button } from "antd";

import { Avatar, Divider, Tooltip } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../../../services/config.json";
import { baseUrl, jsonValue, setImageIfError, toCapitalize, stripTags } from "../../../applocal";
// import Paragraph from "antd/lib/skeleton/Paragraph";

const { Paragraph } = Typography;

const Card = (props) => {
  const { course, deleteCourse } = props;
  const jv = jsonValue;
  const history = useHistory();
  const [img_path, set_img_path] = useState(BASE_URL + (jv(course?.images, {}).get(0) || course?.image)?.url);
  const [ins_img_path, set_ins_img_path] = useState(BASE_URL + (jv(course?.instId?.images).get(0) || course?.instId?.image)?.url);

  setImageIfError(img_path, () => {
    set_img_path(baseUrl("default-image.png"));
  });

  setImageIfError(ins_img_path, () => {
    set_ins_img_path(baseUrl("avatar-default.png"));
  });

  // console.log(course._id, course?.image || course?.images[0]);
  return (
    <Col sm={6} md={3}>
      <div className="p-0 card text-left">
        <Link to={"viewCourse?data=" + course._id}>
          <img className="card-img-top img " src={img_path} alt="not available" style={{ height: 250 }} />
        </Link>
        <div className="card-body" style={{ position: "relative" }}>
          <Link to={"viewCourse?data=" + course._id}>
            <Paragraph ellipsis={{ rows: 1, expandable: false, symbol: " " }} className="card-title fz-1-5 m-0" style={{ fontWeight: "bold" }}>
              {course?.name}
            </Paragraph>
            <Paragraph ellipsis={{ rows: 1, expandable: false, symbol: " " }} className="card-text fz-1">
              {stripTags(course?.description)}
            </Paragraph>
          </Link>
          <div style={{ position: "absolute", right: "10px" }}>
            <Avatar.Group
              maxCount={2}
              maxStyle={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
            >
              <span className="p-2 mr-2">{toCapitalize(course?.instId?.name || "Instructor")}</span>
              <Avatar src={ins_img_path} />
              {/* <Avatar
                style={{
                  backgroundColor: "#f56a00",
                }}
              >
                K
              </Avatar> */}
              {/* <Tooltip title="Ant User" placement="top">
                <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
              </Tooltip>
              <Avatar style={{ backgroundColor: "#1890ff" }} icon={<AntDesignOutlined />} /> */}
            </Avatar.Group>
          </div>

          <p className="card-text mt-6" style={{ fontSize: "10px", float: "right" }}>
            {course?.instructor && course?.instructor.name}
          </p>
          <span className="clearfix"></span>
          <Popconfirm title="Confirm Delete" onConfirm={async () => await deleteCourse(course?._id)}>
            <Button icon={<i class="bi bi-trash text-secondary" />} style={{ backgroundColor: "transparent", border: "none", float: "right" }} />
          </Popconfirm>

          <Button
            style={{ backgroundColor: "transparent", border: "none", float: "right" }}
            icon={<i class="bi bi-pencil" />}
            onClick={() =>
              history.push({
                pathname: `/newCourse`,
                search: `?data=${course?._id}`,
                // search: `?data=${JSON.stringify(course)}`,
                // state: { course },
              })
            }
          />
        </div>
      </div>
    </Col>
  );
};

export default Card;
