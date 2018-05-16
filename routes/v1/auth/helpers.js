const sanitize = require('sanitizer').sanitize;

/**
 * Extracts login params from req body.
 * If one or more of the keys is undefined
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
  } catch(e) {
    return null;
  }
};

/**
 * Extracts data needed for creating account
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

