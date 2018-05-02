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

export async function connectToDb(collName = 'test', dbName = 'qe') {
  return client.db(dbName).collection(collName);
}

export const COLLECTIONS = {
  FACULTY: 'faculty',
  STUDENT: 'student'
};

export const mongoId = id => new ObjectID(id);

