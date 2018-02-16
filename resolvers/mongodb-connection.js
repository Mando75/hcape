import {MongoClient} from 'mongodb';
const assert = require('assert');

const url = process.env.DATABASE_URL;
export const db = async () => await MongoClient.connect(url);