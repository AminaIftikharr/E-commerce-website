// ...existing code...
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.warn('MONGODB_URI not set. Set it in your .env file (do NOT commit credentials).');
}

const client = new MongoClient(uri || '');

export async function createConnection(): Promise<void> {
  if (!uri) return;
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export const getDatabase = (dbName: string) => {
  return client.db(dbName);
};

export const closeDatabaseConnection = async () => {
  await client.close();
  console.log('Database connection closed');
};
// ...existing code...