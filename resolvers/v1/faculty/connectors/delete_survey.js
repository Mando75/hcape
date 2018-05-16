import {COLLECTIONS, connectToDb} from "../../../mongodb-connection";

export const deleteQualtricsSurvey = async (survey_id, user_id) => {
  const conn = connectToDb(COLLECTIONS.FACULTY);
  return await conn.updateOne({_id: user_id, 'surveys.meta.id': survey_id},
      {$pull: {"surveys": {"meta.id": survey_id}}}, );
};
