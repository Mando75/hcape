import React from 'react';
import {Menu, Icon, Layout} from 'antd';

const {Sider} = Layout;

export class Nav extends React.Component {

  state = {
    collapsed: false,
  };

  constructor(props) {
    super(props);
    this.state.width = props.width;
    this.state.role = props.role;
  }

  componentWillMount() {
    this.setState({width: window.innerWidth})
  }

  toggle = () => {
    console.log(this.state.width);
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
        <Sider
            breakpoint="sm"
            collapsedWidth={this.state.width > 450 ? 80 : 0}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.toggle}
            // style={{position: 'fixed', overflow: 'auto', height: '100vh'}}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span className="nav-text">{this.props.name}</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="idcard"/>
              <span className="nav-text">Current Evaluations</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="database"/>
              <span className="nav-text">Past Evaluations</span>
            </Menu.Item>
            {
              this.state.role === 'student' ?
                  <Menu.Item key="4">
                    <Icon type="line-chart"/>
                    <span className="nav-text">Track Your Progress</span>
                  </Menu.Item> :
                  <Menu.Item key="4">
                    <Icon type="plus-circle-o"/>
                    <span className="nav-text">Import a Survey</span>
                  </Menu.Item>
            }
          </Menu>
        </Sider>
    )
  }
}

Nav.defaultProps = {
  width: 1200,
  role: 'student'
};