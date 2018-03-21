import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import FormItem from "antd/es/form/FormItem";
import {AuthService} from "../../../services/AuthService";
import {userActions} from "../../../redux-zero/actions/user";

class NormalLoginForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
        </Form>
    );
  }
}

export const LoginForm = Form.create()(NormalLoginForm);