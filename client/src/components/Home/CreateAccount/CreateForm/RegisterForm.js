import React from 'react';
import {Input} from 'antd';
import FormItem from "antd/es/form/FormItem";

export const RegisterForm = (props) => {
  // TODO Fix errors showing on modal load
  const getFieldDecorator = props.dec;
  return (
      <div>
        <FormItem label={'Username'}>
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: 'Please input your BYUI username!',
            }]
          })(<Input />)}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('pwd', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
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
              validator: this.compareToFirstPassword,
            }],
          })(
              <Input type="password" onBlur={this.handleConfirmBlur}/>
          )}
        </FormItem>
      </div>
  )
};