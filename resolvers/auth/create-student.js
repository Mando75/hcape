import {connectToDb} from "../mongodb-connection";
import {hashPwd} from "../../routes/auth/lib";
const sanitize = require('sanitizer').sanitize;

export async function createStudent(data) {
  const query = await buildQuery(data);
  const conn = await connectToDb('student');
  const opp = await conn.insertOne(query);
  console.log(opp);
  return opp;
}

async function buildQuery(data) {
  return {
    username: sanitize(data.username),
    pwd: await hashPwd(data.pwd),
    email: sanitize(data.email),
    inumber: sanitize(data.inumber),
  }
}
