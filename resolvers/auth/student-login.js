import {connectToDb} from "../mongodb-connection";
import {buildTokenPayload, verifyPwd} from "../../routes/auth/lib";
import {jwtOptions} from "../../routes/auth/strategy";
import * as jwt from 'jsonwebtoken';

//TODO Match user plaintext pwd with hash
export async function studentLogin(username, pwd) {
  const conn = await connectToDb('student');
  const user = await conn.findOne({username: username});
  if (user && await verifyPwd(user.pwd, pwd)) {
    const payload = buildTokenPayload(user);
    const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: '7d'});
    return {
      message: 'login successful',
      status: 200,
      token: token
    }
  } else {
    return {
      message: "Username not found",
      status: 401
    }
  }
}

