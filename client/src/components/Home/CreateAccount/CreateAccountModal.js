import React from 'react';
import {Modal} from 'antd';
import {homeActions} from "../../../redux-zero/actions/home";
import {connect} from 'redux-zero/react';
import {CreateForm} from "./CreateForm/CreateForm";

const MTP = ({home}) => ({home});

export const AccountForm = connect(MTP, homeActions)(class extends React.Component {

  render() {
    const fields = this.props.home.fields;
    const props = this.props;
    console.log(fields);
    return (
        <Modal
            title={'Create Account'}
            visible={props.home.createVis}
            confirmLoading={props._loading}
            onCancel={props.hideCreate}
            footer={null}>
          <CreateForm {...fields} onChange={props.handleFormChange}/>
        </Modal>
    )
  }
});
