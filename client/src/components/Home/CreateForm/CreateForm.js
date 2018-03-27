import React from 'react';
import {Steps, Button, message, Form, Input,} from 'antd';
import FormItem from "antd/es/form/FormItem";
import {RegisterForm} from "./RegisterForm";
import {LinkForm} from "./LinkForm";

const Step = Steps.Step;


class CreateFormClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      current: 0,
    }
  };

  componentDidMount() {
    this.props.form.validateFields();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
    const current = this.state.current + 1;
    this.setState({current});
  };

  prev() {
    const current = this.state.current - 1;
    this.setState({current});
  };

  steps = [{
    title: 'Register',
    content: () => <RegisterForm dec={this.props.form.getFieldDecorator}/>,
  }, {
    title: 'Link',
    content: () => <LinkForm dec={this.props.form.getFieldDecorator}/>,
  }, {
    title: 'Create',
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
              this.state.current < steps.length - 1
              &&
              <Button type="primary" onClick={() => this.next()}>Next</Button>
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
          </div>
          <Steps current={current} size='small' style={{marginTop: '20px'}}>
            {steps.map(item => <Step key={item.title} title={item.title}/>)}
          </Steps>
        </Form>
    );
  };
}

export const CreateForm = Form.create()(CreateFormClass);

