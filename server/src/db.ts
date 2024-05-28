import {MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// TODO: what is my mongo uri?
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db: Db;

export const connectToDb = async (): Promise<Db> => {
    if (!db) {
        await client.connect();
        db = client.db('happenstance_db');
    }
    return db;
};