import React from 'react';
import {Menu, Icon} from 'antd';

export class Nav extends React.Component {
  render() {
    return (
        <div>
          <div className={'logo'}><Icon type="info-circle" /></div>
          <Menu theme={'dark'} mode={'horizontal'} style={{lineHeight: '64px'}}>
          <Menu.Item  key={1}>Nav 1 </Menu.Item>
        </Menu>
        </div>
    )
  }
}