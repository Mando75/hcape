import React from 'react';
import {Modal} from 'antd';
import {homeActions} from "../../../redux-zero/actions/home";
import {connect} from 'redux-zero/react';
import {CreateForm} from "./CreateForm/CreateForm";

const MTP = (store) => ({...store});

export const AccountForm = connect(MTP)(class extends React.Component {

  render() {
    const fields = this.props.home_create_fields;
    const props = this.props;
    console.log(fields);
    return (
        <Modal
            title={'Create Account'}
            visible={props.home_create_visible}
            confirmLoading={props._loading}
            onCancel={homeActions.hideCreate}
            footer={null}>
        <CreateForm />
          {/*<CreateForm {...fields} onChange={props.handleFormChange}/>*/}
        </Modal>
    )
  }
});
