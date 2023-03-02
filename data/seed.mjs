import mongoose from 'mongoose';
import User from '../models/User.js';

import { users } from './users.mjs';


mongoose.connect('mongodb://localhost:27017/geniedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');

  User.insertMany(users).then(() => {
    console.log('Data imported');
    mongoose.connection.close();
  }).catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });
}).catch((err) => console.error('Could not connect to MongoDB', err));
