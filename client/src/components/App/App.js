import React from 'react';
import {Layout, Icon} from 'antd';
import {Nav} from "../Nav/Nav";
import {Switch, Route} from 'react-router-dom';
import {Home} from "../Home/Home";
const {Footer, Content} = Layout;

export class App extends React.Component {

  render() {
    return (
        <Layout style={{minHeight: '100vh'}}>
          <Nav />
          <Layout style={{background: '#234D75'}}>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#001529', minHeight: '90vh', color: 'white' }}>
                <Switch>
                  <Route exact path={'/'} component={Home}/>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center', background: '#234D75'}}>
              <Icon type="copyright" /> 2018 Brigham Young University - Idaho
            </Footer>
          </Layout>
        </Layout>
    )
  }
}