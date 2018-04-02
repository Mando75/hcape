

import {store} from "../store";

export const userActions = {
  setUser: ({user}) => {
    store.setState({...user})
  },
  delUser: () => {
    store.setState({
      user_id: '',
      user_type: '',
      user_email: '',
      user_inumber: '',
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





