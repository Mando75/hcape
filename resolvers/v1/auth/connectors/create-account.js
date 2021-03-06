/**
 * @author Bryan Muller
 *
 * This file contains functions to create new user accounts
 * in MongoDB
 */

import {connectToDb} from "../../../mongodb-connection";
import {hashPwd} from "../helpers/lib";

/**
 * Inserts new user into the database
 * @param data
 * @returns {Promise<*>}
 */
export async function createAccount(data) {
  const query = await buildQuery(data);
  const conn = connectToDb(data.type);
  try {
    const resp = (await conn.insertOne(query)).ops[0];
    // Do not send the password back to the user
    delete resp.pwd;
    // status ok
    resp.status = 200;
    return resp;
  } catch(e) {
    console.log(e);
    return {
      status: 401,
      code: e.code
    }
  }

}

/**
 * Extracts only fields which shall be placed in the db.
 * Assumes pre sanitized input
 * @param data
 * @returns {Promise<{username: *, pwd: *, email: *, inumber: *}>}
 */
async function buildQuery(data) {
  return {
    username: data.username,
    pwd: await hashPwd(data.pwd),
    email: data.email,
    inumber: data.inumber,
    surveys: [],
  }
}
