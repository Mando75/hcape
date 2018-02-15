import React from 'react';
import {Layout} from 'antd';
import {Nav} from "../Nav/Nav";
const {Header, Footer, Content} = Layout;


export class App extends React.Component {

  render() {
    return (
        <Layout style={{minHeight: '100vh'}}>
          <Nav/>
          <Layout>
            {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: '90vh' }}>
                content
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>

    )
  }
}