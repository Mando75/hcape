import BaseService from './BaseService';
import axios from 'axios';

export class AuthService extends BaseService {
  static async log_in(username, pwd, type) {
    return axios({
      method: 'post',
      url: `/api/v1/auth/login`,
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
    }).catch((err) => {
      console.log(err);
      return false
    });
  }

  static async create_account({email, inumber, username, pwd, type}) {
    return axios({
      method: 'post',
      url: '/api/v1/auth/create',
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
    }).then(() => 'Your account is now created. Please sign in')
        .catch((err) => {
          console.log(err.response);
          switch (err.response.data.code) {
            case 11000:
              return "Duplicate field detected. Please check that you do not already have an account";
            default:
              return "There was an error making your account. Please check the fields you entered and try again";
          }
        });
  }
}