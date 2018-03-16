import {connectToDb} from "../mongodb-connection";
import {verifyPwd} from "../../routes/auth/lib";


export async function studentLogin(username) {
  const conn = await connectToDb('student');
  const user = await conn.findOne({username: username});
  const hash = user.pwd;
  console.log(user);
  return user ? verifyPwd(user, hash) : {message: "Username not found", status: 401};
}

