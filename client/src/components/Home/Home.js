import React from 'react';
import {Row, Col, Button} from 'antd';
import {connect} from 'redux-zero/react';
import {combineActions} from 'redux-zero/utils';
import {userActions} from "../../redux-zero/actions/user";
import {loadingActions} from "../../redux-zero/actions/loading";
import {homeActions} from "../../redux-zero/actions/home";
import {Modal} from 'antd';
import {LoginForm} from "./Login Form/LoginForm";
import {AccountForm} from "./CreateAccount/CreateAccountModal";
import {CreateForm, TestForm} from "./CreateAccount/CreateForm/CreateForm";

const MTP = ({_authed, _loading, home}) => ({_authed, _loading, home});
export const Home = connect(MTP, combineActions(userActions, loadingActions))((props) => {
   console.log(props.home);
  return (
      <div className={'user-root'}>
        <Row justify={'center'}>
          <Col span={24}>
            <h1>Welcome</h1>
          </Col>
        </Row>
        <Row>
          <Col offset={4} span={16}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta nisl at erat mattis, quis molestie
              magna lacinia. Etiam sit amet tincidunt dolor. Donec sit amet odio at nisl fermentum consectetur.
              Pellentesque vitae arcu pharetra, commodo tellus ac, lacinia erat. Curabitur varius a odio a eleifend.
              Ut vehicula nisi erat, sit amet dictum nisi posuere in. Etiam eu felis id risus condimentum aliquet in
              nec justo. Nam et urna ante. Donec viverra pellentesque varius. Quisque urna elit, blandit quis aliquet
              et, scelerisque porta augue. Suspendisse potenti. Fusce elementum justo vestibulum maximus rhoncus.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat faucibus felis vel imperdiet.
              Fusce lacus sem, luctus eget turpis eu, pulvinar commodo quam. Suspendisse bibendum non neque ut
              eleifend. Fusce et lorem non lacus sagittis convallis eleifend nec dui. Integer ut ipsum non dui lacinia
              auctor sit amet id lectus. Ut in magna id ligula facilisis suscipit. Donec est ligula, mattis eget nisl
              nec, tempus faucibus felis. Sed sollicitudin eros lobortis, pharetra elit nec, lacinia leo.</p>
          </Col>
        </Row>
        <Row>
          <Col offset={4} span={10}>
            <Button type={'primary'}
                    size={'large'}
                    icon={'user'}
                    onClick={homeActions.showLogin}
                    htmlType={'button'}
                    className={'signin'}>Sign in</Button>
            <Modal
                title={'Login'}
                visible={props.home.loginVis}
                confirmLoading={props._loading}
                onCancel={homeActions.hideLogin}
                footer={null}>
              <LoginForm/>
            </Modal>
            <Button type={'default'} size={'large'} onClick={homeActions.showCreate}>Create Account</Button>
            <Modal
              title={'Create Account'}
              visible={props.home.createVis}
              confirmLoading={props._loading}
              onCancel={homeActions.hideCreate}
              footer={null}>
              <TestForm/>
            </Modal>
            {/*<AccountForm />*/}

            <Button type={'secondary'}
                    icon={'home'}
                    size={'large'}
                    htmlType={'button'}
                    target={'_self'}
                    href={'https://www.byui.edu'}>
              BYU-I&nbsp;&nbsp;
            </Button>
          </Col>
        </Row>
      </div>
  )
});

