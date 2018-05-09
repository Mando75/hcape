import React from 'react';
import {Form, Icon, Input, Button, Spin} from 'antd';
import FormItem from "antd/es/form/FormItem";
import {connect} from 'redux-zero/react';
import {combineActions} from 'redux-zero/utils';
import {AuthService} from "../../../services/AuthService";
import {loadingActions} from "../../../redux-zero/actions/loading";
import {authActions} from "../../../redux-zero/actions/auth";
import {homeActions} from "../../../redux-zero/actions/home";

const MTP = (store) => ({...store});

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credErr: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    loadingActions.startLoading();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const message = await AuthService.log_in(values.username, values.pwd, 'student');
        if (message) {
          this.setState({credErr: false});
          loadingActions.finishLoading();
          homeActions.hideLogin();
          authActions.auth();
        } else {
          loadingActions.finishLoading();
          this.setState({credErr: true});
        }
      }
    });
  };


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
                  <Spin style={{marginLeft: '15px'}}/> : ""
            }
            {
              this.state.credErr ?
                  <p style={{color: 'red'}}>There was a problem with your credentials. Please try again</p> : ""
            }
          </FormItem>
        </Form>
    );
  };
};


export const LoginForm = connect(MTP, combineActions(loadingActions))(Form.create()(NormalLoginForm));