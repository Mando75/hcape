import React from 'react';
import {Row, Col} from 'antd';

export const User = (props) => {
  return (
      <div className={'user-root'}>
        <Row justify={'center'}>
          <Col span={24}>
              <h1>Home</h1>
          </Col>
        </Row>
        <Row>
          <Col offset={4} span={16}>
            <p>Welcome to HCAPE. This tool helps the students and faculty of the
            BYU-Idaho Healthcare Administration Program extend the meaningfulness
            of student group project evaluations. <br/>...<br/> Rest of welcome message here </p>
          </Col>
        </Row>

      </div>
  )
};