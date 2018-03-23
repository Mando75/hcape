import createStore from 'redux-zero';

const initialState = {
  _loading: false,
  _authed: false,
  _collapsed: false,
  user: {
    _id: '',
    type: 'student',
    email: '',
    inumber: '',
    name: 'User',
  },
  home: {
    loginVis: false
  }
};

export const store = createStore(initialState);
