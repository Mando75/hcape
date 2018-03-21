import React from 'react';
import {Menu, Icon, Layout} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {userActions} from "../../redux-zero/actions/user";

const MTP = ({_authed, user}) => ({_authed, user});

const {Sider} = Layout;

class NavClass extends React.Component {

  state = {
    collapsed: false,
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
            collapsed={this.state.collapsed}
            onCollapse={this.toggle}
            // style={{position: 'fixed', overflow: 'auto', height: '100vh'}}
        >
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
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
                     (this.state.user.type === 'student') ?
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

const NavConnect = connect(MTP, userActions)(NavClass);

export const Nav = withRouter(NavConnect);

NavClass.defaultProps = {
  width: 1200
};