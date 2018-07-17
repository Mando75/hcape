/**
 * @author Bryan Muller
 * This file contains functions used to authenticate a user
 * during login
 */
import {connectToDb} from "../../../mongodb-connection";
import {buildTokenPayload, verifyPwd} from "../helpers/lib";
import {jwtOptions} from "../helpers/strategy";
import * as jwt from 'jsonwebtoken';

/**
 * Logs existing user into the application
 * @param username
 * @param pwd
 * @param role
 * @returns {Promise<*>}
 */
export async function login(username, pwd, role) {
  const conn = connectToDb(role);
  // fetch the password associated with the username provided
  const user = await conn.findOne({username: username}, {fields: {pwd: 1}});
  // verify the login password matches provided password
  const validPwd = await verifyPwd(user.pwd, pwd);

  if (user && validPwd) {
    // Create token payload body
    const payload = buildTokenPayload(user);
    // create and sign token. Token lifespan is set in the env variable
    const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: process.env.AUTH_TOKEN_LIFESPAN});
    // fetch user data to be packaged with the token. User fields to be packaged
    // with token can be defined in the userFields object defined below this function
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
 * @type {{}}
 */
const userFields = {
  _id: true,
  email: true,
  inumber: true,
};
