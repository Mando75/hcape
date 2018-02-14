import React from 'react';
import {Layout} from 'antd';
import {Nav} from "../Nav/Nav";
const {Header, Footer, Content} = Layout;


export class App extends React.Component {

  render() {
     return (<div>
       <Layout className={'layout'}>
         <Header><Nav/></Header>
         <Content>Content</Content>
         <Footer>Foot</Footer>
       </Layout>
     </div>)
  }
}