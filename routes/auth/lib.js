import {studentLogin} from "../../resolvers/auth/student-login";

/**
 * Extracts login params from req body.
 * If one or more of the keys is undefined
 * @param body
 * @returns {*}
 */
export const extractLoginData = (body) => {
  try {
    return {
      username: body.username,
      password: body.pwd,
      type: body.type
    }
  } catch(e) {
    return null;
  }
};

export const extractAccountData = (body) => {
  try {
    return {
      username: body.username,
      pwd: body.pwd,
      confirmPwd: body.confirmPwd,
      email: body.email,
      inumber: body.inumber,
      type: body.type
    }
  } catch (e) {
      return null;
  }
};

export const createAccountMap = {
  student: () => null,
  teacher: () => null,
};

export const loginMap = {
  student: studentLogin,
  teacher: () => console.log('teacher')
};

import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {jwtOptions} from "./strategy";

export async function verifyPwd(user, hash) {
  if(await bcrypt.compare(user.pwd, hash)) {
    const payload = buildTokenPayload(user);
    const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '7d'});
    return {message: 'login successful', status: 200, token: token}
  }
  return {message: 'Passwords did not match', status: 401}
}


function buildTokenPayload(user) {
  delete user.pwd;
  return user;
}


export async function hashPwd(pwd) {
  const rounds = 12;
  return await bcrypt.hash(pwd, rounds);
}