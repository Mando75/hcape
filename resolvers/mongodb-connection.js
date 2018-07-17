/**
 * @author Bryan Muller
 */
import {MongoClient, ObjectID} from 'mongodb';

const url = process.env.DATABASE_URL;
let client;
MongoClient.connect(url).then((db) => {
  client = db;
}).catch((err) => {
  console.error('Warning: Connection to Database failed', err);
});

/**
 * Use this function to connect to and make database queries.
 * Must provide collection to connect to.
 * @param collName
 * @param dbName
 * @returns {Promise<Collection>}
 */
export function connectToDb(collName = 'test', dbName = 'qe') {
  return client.db(dbName).collection(collName);
}

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

