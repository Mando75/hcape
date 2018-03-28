

import {store} from "../store";

export const userActions = {
  setUser: ({...user}) => {
    store.setState({
      user_id: id,
      user_type: type,
      user_email: email,
      user_inumber: inumber,
      user_name: name
    })
  },
  delUser: () => {
    store.setState({
      user_id: '',
      user_type: '',
      user_email: '',
      user_inumber: '',
      user_name: '',
    })
  },
  setType: (type) => {
    store.setState({user_type: type});
  },
  setId: (id) => {
    store.setState({user_id: id});
  },
  setEmail: (email) => {
    store.setState({user_email: email});
  },
  setINum: (inumber) => {
    store.setState({user_inumber: inumber});
  },
  setName: (name) => {
    store.setState({user_name: name});
  }
};





