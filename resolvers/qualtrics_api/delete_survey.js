import {COLLECTIONS, connectToDb} from "../mongodb-connection";


export const delete_survey = async (survey_id, user_id) => {
  const conn = connectToDb(COLLECTIONS.FACULTY);
  // console.log(conn);
  // TODO fix $pull request
  return await conn.update({_id: user_id}, {$pull: {'surveys.meta.id': survey_id}});
};