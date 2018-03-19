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


import bcrypt from 'bcrypt';

export async function verifyPwd(hash, pwd) {
  return await bcrypt.compare(pwd, hash);
}


export function buildTokenPayload(user) {
  delete user.pwd;
  return user;
}


export async function hashPwd(pwd) {
  const rounds = 12;
  return await bcrypt.hash(pwd, rounds);
}