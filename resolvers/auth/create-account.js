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
  try {
    const resp = (await conn.insertOne(query)).ops[0];
    delete resp.pwd;
    resp.status = 200;
    console.log(resp);
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
  }
}
