import {connectToDb} from "../../../mongodb-connection";
import {buildTokenPayload, verifyPwd} from "../helpers/lib";
import {jwtOptions} from "../helpers/strategy";
import * as jwt from 'jsonwebtoken';

/**
 * used for user log in.
 * @param username
 * @param pwd
 * @param role
 * @returns {Promise<*>}
 */
export async function login(username, pwd, role) {
  const conn = connectToDb(role);
  const user = await conn.findOne({username: username}, {fields: {pwd: 1}});
  const validPwd = await verifyPwd(user.pwd, pwd);
  if (user && validPwd) {
    const payload = buildTokenPayload(user);
    const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: process.env.AUTH_TOKEN_LIFESPAN});
    const userData = await conn.findOne({_id: user._id}, {fields: userFields});
    return {
      message: 'login successful',
      status: 200,
      token: token,
      user: userData
    }
  } else {
    return validPwd ? {
      message: "Username not found",
      status: 401
    } : {
      message: "Invalid Password",
        status: 401
    }
  }
}


/**
 * Used to specify which fields should be returned in the user object on login
 *
 * @type {{}}
 */
const userFields = {
  _id: true,
  email: true,
  inumber: true,
};
