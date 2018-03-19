import BaseService from './BaseService';
import axios from 'axios';
import {setUser} from "../redux-zero/actions/user";

export default class AuthService extends BaseService {
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
        setUser(data.user);
        this.auth = data.token;
        return true;
    }).catch(() => false);
  }
}