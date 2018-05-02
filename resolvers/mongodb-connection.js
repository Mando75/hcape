import {MongoClient, ObjectID} from 'mongodb';

/**
 * Use this function to connect to and make database queries.
 * Must provide collection to connect to.
 * @param collName
 * @param dbName
 * @returns {Promise<Collection>}
 */

const url = process.env.DATABASE_URL;
let client;
MongoClient.connect(url).then((db) => {
  client = db;
}).catch((err) => {
  console.error('Warning: Connection to Database failed', err);
});

export function connectToDb(collName = 'test', dbName = 'qe') {
  return client.db(dbName).collection(collName);
}
// Old connection function.

// const url = process.env.DATABASE_URL;
// try {
//   const client = await MongoClient.connect(url);
//   // noinspection JSCheckFunctionSignatures
//   return client.db(dbName).collection(collName);
// } catch (e) {
//   console.error('Warning: Connection to Database failed', e);
//   return null;
// }

/**
 * Constant for connecting to Mongo Connections
 * @type {{FACULTY: string, STUDENT: string}}
 */
export const COLLECTIONS = {
  FACULTY: 'faculty',
  STUDENT: 'student'
};

/**
 * Returns a mongo Object id when passed a string
 * @param id
 * @returns {*}
 */
export const mongoId = id => new ObjectID(id);

