/**
 * @author Bryan Muller
 * This file contains various helper functions
 * used for the authentication module
 */

import bcrypt from 'bcrypt';
const sanitize = require('sanitizer').sanitize;

/**
 * Compares hashed passwords to provided passwords.
 * @param hash
 * @param pwd
 * @returns {Promise<*>}
 */
export async function verifyPwd(hash, pwd) {
  return await bcrypt.compare(pwd, hash);
}

/**
 * Builds object to be inserted into the JWT token
 * @param user
 * @returns {*}
 */
export function buildTokenPayload(user) {
  delete user.pwd;
  return user;
}

/**
 * Password hashing
 * @param pwd
 * @returns {Promise<*>}
 */
export async function hashPwd(pwd) {
  const rounds = 12;
  return await bcrypt.hash(pwd, rounds);
}


/**
 * Extracts login params from req body.
 * If one or more of the keys is undefined,
 * it returns null
 * @param body
 * @returns {*}
 */
export const extractLoginData = (body) => {
  try {
    return {
      username: sanitize(body.username),
      password: sanitize(body.pwd),
      type: sanitize(body.type)
    }
  } catch (e) {
    return null;
  }
};

/**
 * Extracts data needed for creating account
 * from the request body
 * @param body
 * @returns {*}
 */
export const extractAccountData = (body) => {
  try {
    return {
      username: sanitize(body.username),
      pwd: sanitize(body.pwd),
      email: sanitize(body.email),
      inumber: sanitize(body.inumber),
      type: sanitize(body.type)
    }
  } catch (e) {
    return null;
  }
};