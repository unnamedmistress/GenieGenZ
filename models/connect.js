import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import User from '../models/User.js';

import { users } from '../data/users.mjs';

const mongodb_url = "mongodb+srv://momchrysti:mA2mrD-khF%403NLU@cluster0.p1qcsqd.mongodb.net/test";

const connect = async () => {
  try {
    await mongoose.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    const client = await MongoClient.connect(mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db();

    try {
      await db.collection('users').insertMany(users);
      console.log('Data imported');
    } catch (err) {
      console.error(err);
    } finally {
      client.close();
      mongoose.connection.close();
    }
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
};

export default connect;
