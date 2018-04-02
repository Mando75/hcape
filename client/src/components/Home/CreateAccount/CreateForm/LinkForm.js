import React from 'react';
import {Input} from 'antd';
import FormItem from 'antd/es/form/FormItem';

export const LinkForm = (props) => {
  const getFieldDecorator = props.dec;
  return (
      <div>
        {/* These inputs prevent Chrome from autofilling the new fields with plaintext pwd */}
        <input style={{display: 'none'}} type="password" name="fakepasswordremembered"/>
        <input style={{display: 'none'}} type="text" name="fakeusernameremembered"/>
        <input style={{display: 'none'}} type="password" name="fakepasswordremembered"/>
        <FormItem label="E-mail">
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            },
              {
                pattern: new RegExp('^[A-Za-z0-9._%+-]+@byui.edu$'),
                message: '\n\n\nYou must use a @byui.edu email address'
              }],
            validateFirst: true,
          })(
              <Input/>
          )}
        </FormItem>
        <FormItem label={"I-Number"}>
          {getFieldDecorator('inumber', {
            rules: [{
              required: true, message: "Please enter your inumber"
            }]
          })(<Input />)}
        </FormItem>
      </div>
  )
};