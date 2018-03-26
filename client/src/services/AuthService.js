import BaseService from './BaseService';
import axios from 'axios';

export class AuthService extends BaseService {
  static async log_in(username, pwd, type) {
    return axios({
      method: 'post',
      url: `/api/auth/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        pwd: pwd,
        type: type
      }
    }).then(({data}) => {
        this.auth = data.token;
        delete data.token;
        return data;
    }).catch((err) => {console.log(err); return false});
  }

  static async create_account(username, pwd, email, inumber, type) {
    return axios({
      method: 'post',
      url: '/api/auth/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        pwd: pwd,
        email: email,
        inumber: inumber,
        type: type
      }
    }).then(({data}) => {
      this.auth = data.token;
      delete data.token;
      return data;
    }).catch((err) => {console.log(err); return false});
  }
}