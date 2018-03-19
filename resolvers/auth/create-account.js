import {connectToDb} from "../mongodb-connection";
import {hashPwd} from "./lib";

/**
 * Inserts new user into the database
 * @param data
 * @returns {Promise<*>}
 */
export async function createAccount(data) {
  const query = await buildQuery(data);
  const conn = await connectToDb('student');
  return await conn.insertOne(query);
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
  }
}
