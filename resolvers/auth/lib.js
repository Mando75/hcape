import bcrypt from 'bcrypt';

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