import {connectToDb} from "../mongodb-connection";
import {buildTokenPayload, verifyPwd} from "./lib";
import {jwtOptions} from "../../routes/auth/strategy";
import * as jwt from 'jsonwebtoken';

/**
 * used for user log in.
 * @param username
 * @param pwd
 * @param role
 * @returns {Promise<*>}
 */
export async function login(username, pwd, role) {
  const conn = await connectToDb(role);
  const user = await conn.findOne({username: username}, {fields: {pwd: 1}});
  if (user && await verifyPwd(user.pwd, pwd)) {
    const payload = buildTokenPayload(user);
    const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '7d'});
    const userData = await conn.findOne({_id: user._id}, {fields: userFields});
    return {
      message: 'login successful',
      status: 200,
      token: token,
      user: userData
    }
  } else {
    return {
      message: "Username not found",
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
