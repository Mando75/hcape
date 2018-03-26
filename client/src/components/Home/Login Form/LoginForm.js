import React from 'react';
import { Form, Icon, Input, Button, Spin} from 'antd';
import FormItem from "antd/es/form/FormItem";
import {connect} from 'redux-zero/react';
import {combineActions} from 'redux-zero/utils';
import {AuthService} from "../../../services/AuthService";
import {userActions} from "../../../redux-zero/actions/user";
import {loadingActions} from "../../../redux-zero/actions/loading";
import {authActions} from "../../../redux-zero/actions/auth";
import {homeActions} from "../../../redux-zero/actions/home";

const MTP = ({_authed, _loading, home, user}) => ({_authed, _loading, home, user});
class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.startLoading();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const message = await AuthService.log_in(values.username, values.pwd, 'student');
        console.log(message);
        if (message) {
          this.props.finishLoading();
          this.props.hideLogin();
          this.props.auth();
        }
      }
    });
  };

  _loadingIndicator = <Icon type={"loading"} style={{fontSize: 24}} spin/>;

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pwd', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="Password"/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            {
              this.props._loading ?
                  <Spin  style={{marginLeft: '15px'}}/> : ""
            }
          </FormItem>
        </Form>
    );
  };
};



export const LoginForm = connect(MTP, combineActions(userActions, loadingActions, authActions, homeActions))(Form.create()(NormalLoginForm));