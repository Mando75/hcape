import {COLLECTIONS, connectToDb, mongoId} from "../mongodb-connection";

export const save_survey = async (parsedSurvey, _id) => {
  const conn = connectToDb(COLLECTIONS.FACULTY);
  const dbUpdateResp = await conn.findOneAndUpdate({_id: _id},
      {$addToSet: {surveys: parsedSurvey}}, {returnNewDocument: true, returnOriginal: false});
  return {
    status: dbUpdateResp.lastErrorObject.updatedExisting ? 200 : 500,
    data: dbUpdateResp.value,
  };
};