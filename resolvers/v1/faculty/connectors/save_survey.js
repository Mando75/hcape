/**
 * @author Bryan Muller
 */
import {COLLECTIONS, connectToDb} from "../../../mongodb-connection";

/**
 * Saves a parsed Qualtrics survey to a teachers record in MongoDB
 * @param parsedSurvey
 * @param _id
 * @returns {Promise<{status: number, data: *}>}
 */
export const saveQualtricsSurvey = async (parsedSurvey, _id) => {
  const conn = connectToDb(COLLECTIONS.FACULTY);
  const dbUpdateResp = await conn.findOneAndUpdate({_id: _id},
      {$addToSet: {surveys: parsedSurvey}}, {returnNewDocument: true, returnOriginal: false});
  return {
    status: dbUpdateResp.lastErrorObject.updatedExisting ? 200 : 500,
    data: dbUpdateResp.value,
  };
};