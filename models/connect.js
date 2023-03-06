import mongoose from 'mongoose';

const mongodb_url = process.env.REACT_APP_MONGODB_URI;

const connectionPromise = mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => console.error('Could not connect to MongoDB', err));

export default async function connect() {
  await connectionPromise;
  return mongoose.connection;
}
