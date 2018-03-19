import bcrypt from 'bcrypt';

export async function verifyPwd(hash, pwd) {
  return await bcrypt.compare(pwd, hash);
}


export function buildTokenPayload(user) {
  delete user.pwd;
  return user;
}


export async function hashPwd(pwd) {
  const rounds = 12;
  return await bcrypt.hash(pwd, rounds);
}