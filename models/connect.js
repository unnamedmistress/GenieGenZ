import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: new URL('./.env', import.meta.url).pathname });

const connectionPromise = mongoose.connect("mongodb+srv://momchrysti:mA2mrD-khF%403NLU@cluster0.p1qcsqd.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => console.error('Could not connect to MongoDB', err));
console.log('Connected to MongoDB'+ process.env.REACT_APP_MONGODB_URI);
export default async function connect() {
  await connectionPromise;
  return mongoose.connection;
}