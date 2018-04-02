import createStore from 'redux-zero';

const initialState = {
  _loading: false,
  _authed: false,
  user_id: '',
  user_type: '',
  user_email: '',
  user_inumber: '',
  user_name: 'User',
  home_login_visible: false,
  home_login_loading: false,
  home_create_visible: false,
};

export const store = createStore(initialState);
