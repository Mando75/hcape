import {MongoClient, ObjectID} from 'mongodb';

/**
 * Use this function to connect to and make database queries.
 * Must provide collection to connect to.
 * @param collName
 * @param dbName
 * @returns {Promise<Collection>}
 */
export async function connectToDb(collName = 'test', dbName = 'qe') {
    const url = process.env.DATABASE_URL;
    try {
        const client = await MongoClient.connect(url);
        // noinspection JSCheckFunctionSignatures
        return client.db(dbName).collection(collName);
    } catch (e) {
        console.error('Warning: Connection to Database failed', e);
    }
}

export const COLLECTIONS = {
    FACULTY: 'faculty',
    STUDENT: 'student'
};

export const mongoId = id => new ObjectID(id);

