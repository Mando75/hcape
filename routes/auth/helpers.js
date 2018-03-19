import {studentLogin} from "../../resolvers/auth/student-login";
import {createStudent} from "../../resolvers/auth/create-student";

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
  student: () => createStudent,
  teacher: () => null,
};

export const loginMap = {
  student: studentLogin,
  teacher: () => console.log('teacher')
};