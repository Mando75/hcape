import createStore from 'redux-zero';

const initialState = {
  _loading: false,
  _authed: false,
  _collapsed: false,
  user_id: '',
  user_type: '',
  user_email: '',
  user_inumber: '',
  user_name: '',
  home_login_visible: false,
  home_login_loading: false,
  home_create_visible: false,
  home_create_fields: {
    username: {
      value: ' '
    },
    pwd: {
      value: ' '
    },
    email: {
      value: ' '
    },
    inumber: {
      value: ' '
    }
  }

};

export const store = createStore(initialState);
