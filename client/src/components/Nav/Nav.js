import React from 'react';
import {Menu, Icon, Layout} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {userActions} from "../../redux-zero/actions/user";
import {navActions} from "../../redux-zero/actions/nav";
import {combineActions} from "redux-zero/utils";

const MTP = ({_authed, user, _collapsed}) => ({_authed, user, _collapsed});

const {Sider} = Layout;

class NavClass extends React.Component {

  state = {
    selectedNav: 'home'
  };

  constructor(props) {
    super(props);
    this.state = props;
  }

  componentWillMount() {
    this.setState({width: window.innerWidth})
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const {location} = this.props;
    return (
        <Sider
            breakpoint="sm"
            collapsedWidth={this.state.width > 450 ? 80 : 0}
            collapsible
            collapsed={this.props._collapsed}
            onCollapse={this.props.toggleNav}
            // style={{position: 'fixed', overflow: 'auto', height: '100vh'}}
        >
          <Menu theme="dark" mode="inline">
            <Menu.Item key="/">
              <Link to={'/'}>
                <Icon type="user"/>
                <span className="nav-text">{this.props.user.name}</span>
              </Link>
            </Menu.Item>
            {
              (this.props._authed) ?
              <div><Menu.Item key="/s/curreval">
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
                     (this.props.user.type === 'student') ?
                          <Menu.Item key="/s/track">
                            <Link to={'/s/track'}>
                              <Icon type="line-chart"/>
                              <span className="nav-text">Track Your Progress</span>
                            </Link>
                          </Menu.Item>
                          :
                          <Menu.Item key="/t/import">
                            <Link to={'/t/import'}>
                              <Icon type="plus-circle-o"/>
                              <span className="nav-text">Import a Survey</span>
                            </Link>
                          </Menu.Item>
                     </div>
                  : ''
            }
          </Menu>
        </Sider>
    )
  }
}

const NavConnect = connect(MTP, combineActions(userActions, navActions))(NavClass);

export const Nav = withRouter(NavConnect);

NavClass.defaultProps = {
  width: 1200
};