import React from 'react';
import {Steps, Button, message, Form, Spin} from 'antd';
import {RegisterForm} from "./RegisterForm";
import {LinkForm} from "./LinkForm";
import {loadingActions} from "../../../../redux-zero/actions/loading";
import {AuthService} from "../../../../services/AuthService";
import {homeActions} from "../../../../redux-zero/actions/home";
import {connect} from 'redux-zero/react';

const Step = Steps.Step;


const MTP = (store) => ({...store});
class CreateFormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      current: 0,
    }
  };

  componentWillUnmount() {
    this.setState({current: 0});
  }

  componentDidMount() {
    this.props.form.validateFields();
  };

  handleSubmit = (e) => {
    const props = this.props
    e.preventDefault();
    loadingActions.startLoading();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        values.type = 'student';
        values.username = props.home_create_username;
        values.pwd = props.home_create_pwd;
        const msg = await AuthService.create_account({...values});

        loadingActions.finishLoading();
        this.next();
      }
    });

  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pwd')) {
      callback("Your passwords don't match!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  next() {
    if(this.state.current === 0) {
      this.saveFields();
    }
    const current = this.state.current + 1;
    this.setState({current});
  };

  prev() {
    const current = this.state.current - 1;
    this.setState({current});
  };

  saveFields() {
     const vals = this.props.form.getFieldsValue(['username', 'pwd']);
     homeActions.saveCreateUsername(vals.username);
     homeActions.saveCreatePwd(vals.pwd)
  }

  steps = [{
    title: 'Register',
    content: () => <RegisterForm
        pwdValidator={this.validateToNextPassword}
        confirmPwdValidator={this.compareToFirstPassword}
        dec={this.props.form.getFieldDecorator}/>,
  }, {
    title: 'Link',
    content: () => <LinkForm dec={this.props.form.getFieldDecorator} />,
  }, {
    title: 'Confirm',
    content: () => 'Last-content',
  }];


  render() {
    const steps = this.steps;
    const {current} = this.state;
    return (
        <Form onSubmit={this.handleSubmit}>
          <div className="steps-content">{steps[this.state.current].content()}</div>
          <div className="steps-action" style={{marginTop: '20px'}}>
            {
              this.state.current === 0
              &&
              <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
              this.state.current === 1
              &&
              <Button type={'primary'} htmlType="submit">Create</Button>
            }
            {
              this.state.current === steps.length - 1
              &&
              <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
            }
            {
              this.state.current > 0
              &&
              <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                Previous
              </Button>
            }
            {
              this.props._loading
                &&
              <Spin style={{marginLeft: '15px'}} />
            }
          </div>
          <Steps current={current} size='small' style={{marginTop: '20px'}}>
            {steps.map(item => <Step key={item.title} title={item.title}/>)}
          </Steps>
        </Form>
    );
  };
}

export const CreateForm = connect(MTP)(Form.create()(CreateFormClass));



