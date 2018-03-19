import store from '../store';

export const setUser = (user) => {
  store.setState({...user});
}

export const delUser = () => {
  store.setState({
    _id: '',
    type: '',
    email: '',
    inumber: ''
  })
};