import BaseService from './BaseService';
import axios from 'axios';
import {userActions} from "../redux-zero/actions/user";
import {authActions} from "../redux-zero/actions/auth";

export class AuthService extends BaseService {
  static log_in(username, pwd, type) {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER}/api/auth/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        pwd: pwd,
        type: type
      }
    }).then(({data}) => {
        userActions.setUser(data.user);
        this.auth = data.token;
        authActions.auth();
        return true;
    }).catch(() => false);
  }
}