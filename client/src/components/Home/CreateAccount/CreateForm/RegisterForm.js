import React from 'react';
import {Input} from 'antd';
import FormItem from "antd/es/form/FormItem";
import {connect} from 'redux-zero/react';

const MTP = (store) => ({...store});

export const RegisterForm = connect(MTP)((props) => {
  // TODO Fix errors showing on modal load
  const getFieldDecorator = props.dec;
  return (
      <div>
        <FormItem label={'Username'}>
          {getFieldDecorator('username', {
            initialValue: props.home_create_username,
            rules: [{
              required: true, message: 'Please input your BYUI username!',
            }]
          })(<Input />)}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('pwd', {
            initialValue: props.home_create_pwd,
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: props.pwdValidator,
            }],
          })(
              <Input type="password"/>
          )}
        </FormItem>
        <FormItem label="Confirm Password">
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: props.confirmPwdValidator,
            }],
          })(
              <Input type="password"
                     onBlur={this.handleConfirmBlur}/>
          )}
        </FormItem>
      </div>
  )
});