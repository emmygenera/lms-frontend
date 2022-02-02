import React from 'react'
import card from './card.jpg'
import './admincourses.scss'
import { Col } from 'react-bootstrap'
import { Typography, Slider, Popconfirm, Button } from 'antd'

import { Avatar, Divider, Tooltip } from 'antd'
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { BASE_URL } from '../../../services/config.json'
// import Paragraph from "antd/lib/skeleton/Paragraph";

const { Paragraph } = Typography

const Card = (props) => {
  const { course, deleteCourse } = props
  const history = useHistory()

  return (
    <Col sm={6} md={3}>
      <div className="p-0 card text-left">
        <img className="card-img-top " src={BASE_URL + course?.image?.url} alt="not available" style={{ height: '150px' }} />
        <div className="card-body" style={{ position: 'relative' }}>
          <Paragraph ellipsis={{ rows: 1, expandable: false, symbol: ' ' }} className="card-title" style={{ fontSize: '13px', fontWeight: 'bold' }}>
            {course.name}
          </Paragraph>
          <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: ' ' }} className="card-text" style={{ fontSize: '10px' }}>
            {course.description}
          </Paragraph>
          <div style={{ position: 'absolute', right: '10px' }}>
            <Avatar.Group
              maxCount={2}
              maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
              }}
            >
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar
                style={{
                  backgroundColor: '#f56a00',
                }}
              >
                K
              </Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Tooltip>
              <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
            </Avatar.Group>
          </div>

          <p className="card-text mt-6" style={{ fontSize: '10px', float: 'right' }}>
            {course.instructor && course.instructor.name}
          </p>
          <span className="clearfix"></span>
          <Popconfirm title="Confirm Delete" onConfirm={async () => await deleteCourse(course._id)}>
            <Button icon={<i class="bi bi-trash text-secondary" />} style={{ backgroundColor: 'transparent', border: 'none', float: 'right' }} />
          </Popconfirm>

          <Button
            style={{ backgroundColor: 'transparent', border: 'none', float: 'right' }}
            icon={<i class="bi bi-pencil" />}
            onClick={() =>
              history.push({
                pathname: `/newCourse`,
                search: `?data=${JSON.stringify(course)}`,
                state: { course },
              })
            }
          />
        </div>
      </div>
    </Col>
  )
}

export default Card
