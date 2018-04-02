import {store} from "../store";

export const homeActions = {
  showLogin: () => store.setState({home_login_visible: true}),
  hideLogin: () => store.setState({home_login_visible: false}),
  showCreate: () => store.setState({home_create_visible: true}),
  hideCreate: () => store.setState({home_create_visible: false}),
  saveCreateUsername: (n) => store.setState({home_create_username: n}),
  saveCreatePwd: (p) => store.setState({home_create_pwd: p})
};