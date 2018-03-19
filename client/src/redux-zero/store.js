import createStore from 'redux-zero';

const initialState = {
  _loading: false,
  _authed: false,
  _id: '',
  type: '',
  email: '',
};

const store = createStore(initialState);

export default store;