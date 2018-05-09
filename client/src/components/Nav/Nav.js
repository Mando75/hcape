import React from 'react';
import {Menu, Icon, Layout} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {userActions} from "../../redux-zero/actions/user";
import {navActions} from "../../redux-zero/actions/nav";
import {combineActions} from "redux-zero/utils";

const MTP = (store) => ({...store});

const {Sider} = Layout;

class NavClass extends React.Component {
  // set nav as open
  state = {
    _collapsed: false
  };

  /**
   * Toggles the nav state to either open or collapsed
   * @returns {*}
   */
  toggleNav = () => this.setState({_collapsed: !this.state._collapsed});


  // this determines if the nav will load as mobile
  componentWillMount() {
    this.setState({width: window.innerWidth});
  }

  roleMenu = () => {
    return (
        this.props.user_type === 'student' ?
            <Menu.Item key="/s/track">
              <Link to={'/s/track'}>
                <Icon type="line-chart"/>
                <span className="nav-text">Track Your Progress</span>
              </Link>
            </Menu.Item> :
            <Menu.Item key="/t/import">
              <Link to={'/t/import'}>
                <Icon type="plus-circle-o"/>
                <span className="nav-text">Import a Survey</span>
              </Link>
            </Menu.Item>
    )
  };


  render() {
    const {location} = this.props;
    return (
        <Sider
            breakpoint="sm"
            collapsedWidth={this.state.width > 450 ? 80 : 0}
            collapsible
            collapsed={this.state._collapsed}
            onCollapse={this.toggleNav}
            // style={{position: 'fixed', overflow: 'auto', height: '100vh'}}
        >
          {this.props._authed ?
              (<Menu theme={"dark"} mode="inline" selectedKeys={[location.pathname]}>
                <Menu.Item key="/">
                  <Link to={'/'}>
                    <Icon type="user"/>
                    <span className="nav-text">{this.props.user_email}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/s/curreval">
                  <Link to={'/s/curreval'}>
                    <Icon type="idcard"/>
                    <span className="nav-text">Current Semester</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/s/pasteval">
                  <Link to={'/s/pasteval'}>
                    <Icon type="database"/>
                    <span className="nav-text">Past Semester</span>
                  </Link>
                </Menu.Item>
                {this.roleMenu()}</Menu>)
              : (<Menu theme={"dark"} mode="inline" selectedKeys={[location.pathname]}><Menu.Item key="/">
                <Link to={'/'}>
                  <Icon type="user"/>
                  <span className="nav-text">{this.props.user_email}</span>
                </Link>
              </Menu.Item></Menu>)
          }
        </Sider>
    )
  }
}

const NavConnect = connect(MTP, combineActions(userActions, navActions))(NavClass);

export const Nav = withRouter(NavConnect);

NavClass.defaultProps = {
  width: 1200
};



