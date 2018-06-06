import {COLLECTIONS, connectToDb} from "../../../mongodb-connection";

export const getQualtricsId = async (user_id) => {
  const conn = connectToDb(COLLECTIONS.FACULTY);
  // TODO find one
  return conn.findOne({})
};