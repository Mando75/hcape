import {MongoClient} from 'mongodb';

export async function connectToDb(collName = 'test', dbName = 'qe') {
  const url = process.env.DATABASE_URL;
  try {
    const client = await MongoClient.connect(url);
    return client.db(dbName).collection(collName);
  } catch (e) {
    console.error('Warning: Connection to Database failed', e);
  }
}

